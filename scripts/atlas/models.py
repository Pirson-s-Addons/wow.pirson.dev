# The bosses in 3D: each creature model of the WoW Forever client (M2 + its first skin + its textures) as a
# glTF binary (public/atlas/models/npc-<display id>.glb) with a single animation, the Stand loop, so it stays light.
# Humanoid bosses (a character model dressed by CreatureDisplayInfoExtra) wait for the dressing room's
# character pipeline. The page shows the .glb with <model-viewer>.
# Usage: npm run atlas:models            (only what is missing)
#        npm run atlas:models -- 7125    (these display ids, rebuilt)
import io
import json
import struct
import sys
from pathlib import Path
from PIL import Image

sys.path.insert(0, str(Path(__file__).parent))  # run with python -I: the helpers next to this file
from wago import ROOT, table, file, texture

OUT = ROOT / "public" / "atlas" / "models"
OUT.mkdir(parents=True, exist_ok=True)
MAX_TEX = 512  # textures are downscaled to this: the viewer is a panel, not the game


def chunks(data: bytes) -> dict[str, bytes]:
    """The chunks of a chunked M2 (MD21, SFID, TXID...); an old unchunked MD20 is its own MD21."""
    if data[:4] == b"MD20":
        return {"MD21": data}
    out, i = {}, 0
    while i + 8 <= len(data):
        tag, size = data[i : i + 4].decode("ascii"), struct.unpack_from("<I", data, i + 4)[0]
        out[tag] = data[i + 8 : i + 8 + size]
        i += 8 + size
    return out


def arr(d: bytes, at: int) -> tuple[int, int]:
    """An M2Array (count, offset) at a header offset."""
    return struct.unpack_from("<II", d, at)


class M2:
    def __init__(self, fdid: int):
        c = chunks(file(fdid))
        d = self.d = c["MD21"]
        assert d[:4] == b"MD20", f"{fdid}: not an M2"
        n, o = arr(d, 60)
        self.verts = [struct.unpack_from("<3f4B4B3f2f2f", d, o + 48 * i) for i in range(n)]
        n, o = arr(d, 80)
        self.textures = [struct.unpack_from("<II", d, o + 16 * i) for i in range(n)]  # (type, flags)
        n, o = arr(d, 112)
        self.materials = [struct.unpack_from("<HH", d, o + 4 * i) for i in range(n)]  # (flags, blend)
        n, o = arr(d, 128)
        self.tex_combos = list(struct.unpack_from(f"<{n}H", d, o))
        txid = c.get("TXID", b"")
        self.txid = list(struct.unpack_from(f"<{len(txid) // 4}I", txid))
        sfid = c.get("SFID", b"")
        self.skins = list(struct.unpack_from(f"<{len(sfid) // 4}I", sfid))

    def skin(self):
        """The first (most detailed) skin: local vertex list, triangles, submeshes and batches."""
        s = file(self.skins[0])
        assert s[:4] == b"SKIN"
        n, o = arr(s, 4)
        local = struct.unpack_from(f"<{n}H", s, o)
        n, o = arr(s, 12)
        tris = struct.unpack_from(f"<{n}H", s, o)
        n, o = arr(s, 28)
        subs = [struct.unpack_from("<6H", s, o + 48 * i) for i in range(n)]  # id, level, vstart, vcount, istart, icount
        n, o = arr(s, 36)
        batches = [struct.unpack_from("<BbH11H", s, o + 24 * i) for i in range(n)]
        return local, tris, subs, batches

    def bones(self):
        """Each bone: (parent, pivot, tracks of the Stand loop) - tracks are {path: (interpolation, times ms, values)}."""
        d = self.d
        n, o = arr(d, 28)
        seqs = [struct.unpack_from("<HHIfI", d, o + 64 * i) for i in range(n)]  # id, variation, duration, speed, flags
        stand = next((i for i, s in enumerate(seqs) if s[0] == 0 and s[1] == 0), None)
        # the Stand keys live in this file only when the sequence is embedded (flag 0x20); else no motion
        live = stand is not None and seqs[stand][4] & 0x20
        out = []
        n, o = arr(d, 44)
        for b in range(n):
            base = o + 88 * b
            parent = struct.unpack_from("<h", d, base + 8)[0]
            pivot = struct.unpack_from("<3f", d, base + 76)
            tracks = {}
            for path, at, fmt, size in (("translation", 16, "<3f", 12), ("rotation", 36, "<4h", 8), ("scale", 56, "<3f", 12)):
                interp, gseq = struct.unpack_from("<Hh", d, base + at)
                nt, ot = arr(d, base + at + 4)
                nv, ov = arr(d, base + at + 12)
                k = 0 if gseq >= 0 else stand  # a global sequence keeps one timeline of its own
                if not live or k is None or k >= nt or k >= nv:
                    continue
                ct, pt = arr(d, ot + 8 * k)
                cv, pv = arr(d, ov + 8 * k)
                if not ct or not cv:
                    continue
                times = struct.unpack_from(f"<{ct}I", d, pt)
                step = 3 if interp >= 2 and cv == 3 * ct else 1  # hermite/bezier keep in/out tangents too
                values = [struct.unpack_from(fmt, d, pv + size * step * i) for i in range(ct)]
                tracks[path] = (interp, times, values)
            out.append((parent, pivot, tracks))
        return out


def trs(t, q, sc):
    """A 3x4 affine matrix from translation, rotation quaternion (x, y, z, w) and scale."""
    x, y, z, w = q
    r = [[1 - 2 * (y * y + z * z), 2 * (x * y - z * w), 2 * (x * z + y * w)],
         [2 * (x * y + z * w), 1 - 2 * (x * x + z * z), 2 * (y * z - x * w)],
         [2 * (x * z - y * w), 2 * (y * z + x * w), 1 - 2 * (x * x + y * y)]]
    return [[r[i][0] * sc[0], r[i][1] * sc[1], r[i][2] * sc[2], t[i]] for i in range(3)]


def mul(a, b):
    return [[sum(a[i][k] * b[k][j] for k in range(3)) + (a[i][3] if j == 3 else 0) for j in range(4)] for i in range(3)]


def apply(m, p):
    return [m[i][0] * p[0] + m[i][1] * p[1] + m[i][2] * p[2] + m[i][3] for i in range(3)]


def quat(q: tuple[int, int, int, int]) -> tuple[float, ...]:
    """An M2 compressed quaternion (int16 x, y, z, w) as floats."""
    return tuple((v + 32768 if v < 0 else v - 32767) / 32767 for v in q)


def shown(geoset: int, wanted: dict[int, int]) -> bool:
    """Creature geosets: group 0 is the body (all shown); another group shows its chosen value (1 by default)."""
    group, value = divmod(geoset, 100)
    return group == 0 or value == wanted.get(group, 1)


def to_gltf(m: M2, typed: dict[int, int], show) -> tuple[bytes, list[float]]:
    """typed: texture type -> file id (11-13 a creature's skins, 1 a humanoid's baked body...); show(geoset id)."""
    local, tris, subs, batches = m.skin()
    buf = bytearray()
    views, accessors, meshes_prims, images, textures_, materials = [], [], [], [], [], []
    tex_index: dict[int, int] = {}

    seen: dict[bytes, int] = {}

    def view(data: bytes, target: int | None = None) -> int:
        if target is None and data in seen:  # the bones share their key times: one copy
            return seen[data]
        while len(buf) % 4:
            buf.append(0)
        views.append({"buffer": 0, "byteOffset": len(buf), "byteLength": len(data), **({"target": target} if target else {})})
        buf.extend(data)
        if target is None:
            seen[data] = len(views) - 1
        return len(views) - 1

    def tex_of(i: int) -> int | None:
        kind, flags = m.textures[i]
        fid = m.txid[i] if kind == 0 and i < len(m.txid) else typed.get(kind, 0)
        if not fid:
            return None
        if fid not in tex_index:
            img = texture(fid)
            img.thumbnail((MAX_TEX, MAX_TEX))
            out = io.BytesIO()
            img.save(out, "WEBP", quality=88, method=6)
            images.append({"bufferView": view(out.getvalue()), "mimeType": "image/webp"})
            wrap = lambda bit: 10497 if flags & bit else 33071  # REPEAT or CLAMP_TO_EDGE
            samplers.append({"magFilter": 9729, "minFilter": 9987, "wrapS": wrap(1), "wrapT": wrap(2)})
            textures_.append({"extensions": {"EXT_texture_webp": {"source": len(images) - 1}}, "sampler": len(samplers) - 1})
            tex_index[fid] = len(textures_) - 1
        return tex_index[fid]

    samplers: list[dict] = []
    # every vertex the skin uses, in glTF axes: WoW is X forward, Y left, Z up -> glTF X right, Y up, Z to the viewer
    pos, nrm, uv = bytearray(), bytearray(), bytearray()
    lo, hi = [1e9] * 3, [-1e9] * 3
    for g in local:
        v = m.verts[g]
        p = (v[1], v[2], v[0])
        pos += struct.pack("<3f", *p)
        nrm += struct.pack("<3f", v[12], v[13], v[11])
        uv += struct.pack("<2f", v[14], v[15])
        lo = [min(a, b) for a, b in zip(lo, p)]
        hi = [max(a, b) for a, b in zip(hi, p)]
    count = len(local)
    accessors.append({"bufferView": view(bytes(pos), 34962), "componentType": 5126, "count": count, "type": "VEC3", "min": lo, "max": hi})
    accessors.append({"bufferView": view(bytes(nrm), 34962), "componentType": 5126, "count": count, "type": "VEC3"})
    accessors.append({"bufferView": view(bytes(uv), 34962), "componentType": 5126, "count": count, "type": "VEC2"})
    attributes = {"POSITION": 0, "NORMAL": 1, "TEXCOORD_0": 2}

    # the Stand loop: bones as nodes (pivot-relative), each vertex's 4 bones and weights, one animation
    bones = m.bones()
    moving = any(t for _, _, t in bones)
    if moving:
        wide = len(bones) > 255
        joints, weights = bytearray(), bytearray()
        for g in local:
            v = m.verts[g]
            w = list(v[3:7]) if sum(v[3:7]) else [255, 0, 0, 0]
            w[w.index(max(w))] += 255 - sum(w)  # normalized weights must sum to exactly 1
            joints += struct.pack("<4H" if wide else "<4B", *v[7:11])
            weights += struct.pack("<4B", *w)
        accessors.append({"bufferView": view(bytes(joints), 34962), "componentType": 5123 if wide else 5121, "count": count, "type": "VEC4"})
        accessors.append({"bufferView": view(bytes(weights), 34962), "componentType": 5121, "normalized": True, "count": count, "type": "VEC4"})
        attributes |= {"JOINTS_0": 3, "WEIGHTS_0": 4}

    mat_index: dict[tuple, int] = {}
    drawn: set[int] = set()
    for b in batches:
        sub_i, mat_i, combo_i = b[3], b[6], b[9]  # skin section, material, texture combo
        sid, level, _, _, istart, icount = subs[sub_i]
        if not show(sid):
            continue
        t = tex_of(m.tex_combos[combo_i])
        if t is None:
            continue
        flags, blend = m.materials[mat_i]
        key = (t, blend, flags & 4)
        if key not in mat_index:
            mode = "OPAQUE" if blend == 0 else "MASK" if blend == 1 else "BLEND"
            materials.append({
                "pbrMetallicRoughness": {"baseColorTexture": {"index": t}, "metallicFactor": 0, "roughnessFactor": 1},
                "alphaMode": mode, **({"alphaCutoff": 0.5} if mode == "MASK" else {}),
                "doubleSided": bool(flags & 4),
                **({"extensions": {"KHR_materials_unlit": {}}} if flags & 1 else {}),
            })
            mat_index[key] = len(materials) - 1
        start = istart + (level << 16)
        drawn.update(tris[start : start + icount])
        idx = struct.pack(f"<{icount}H", *tris[start : start + icount])
        accessors.append({"bufferView": view(idx, 34963), "componentType": 5123, "count": icount, "type": "SCALAR"})
        meshes_prims.append({"attributes": attributes, "indices": len(accessors) - 1, "material": mat_index[key]})

    assert meshes_prims, "nothing to draw"
    nodes: list[dict] = [{"mesh": 0}]
    roots = [0]
    extra: dict = {}
    if moving:
        axes = lambda v: (v[1], v[2], v[0])  # WoW -> glTF, as for the vertices
        piv = [axes(p) for _, p, _ in bones]
        rest = [tuple(a - b for a, b in zip(piv[i], piv[par] if par >= 0 else (0, 0, 0))) for i, (par, _, _) in enumerate(bones)]
        for i, (par, _, _) in enumerate(bones):
            nodes.append({"translation": list(rest[i])})
        for i, (par, _, _) in enumerate(bones):
            if par >= 0:
                nodes[par + 1].setdefault("children", []).append(i + 1)
            else:
                roots.append(i + 1)
        ibm = b"".join(struct.pack("<16f", 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -x, -y, -z, 1) for x, y, z in piv)
        accessors.append({"bufferView": view(ibm), "componentType": 5126, "count": len(bones), "type": "MAT4"})
        nodes[0]["skin"] = 0
        extra["skins"] = [{"joints": list(range(1, len(bones) + 1)), "inverseBindMatrices": len(accessors) - 1}]
        channels, samplers_a = [], []
        for i, (_, _, tracks) in enumerate(bones):
            for path, (interp, times, values) in tracks.items():
                keep = [k for k in range(len(times)) if k == 0 or times[k] > times[k - 1]]  # strictly increasing
                if all(values[k] == values[keep[0]] for k in keep):
                    if path != "rotation" and values[keep[0]] == ((1, 1, 1) if path == "scale" else (0, 0, 0)):
                        continue  # never moves from rest
                    keep = keep[:1]  # one pose held: one key
                t = [times[k] / 1000 for k in keep]
                if path == "rotation":
                    out = b"".join(struct.pack("<4h", *(round(max(-1, min(1, c)) * 32767) for c in (q[1], q[2], q[0], q[3]))) for q in (quat(values[k]) for k in keep))
                    acc = {"componentType": 5122, "normalized": True, "type": "VEC4"}
                else:
                    vals = [axes(values[k]) for k in keep]
                    if path == "translation":
                        vals = [tuple(a + b for a, b in zip(rest[i], v)) for v in vals]
                    out = b"".join(struct.pack("<3f", *v) for v in vals)
                    acc = {"componentType": 5126, "type": "VEC3"}
                accessors.append({"bufferView": view(struct.pack(f"<{len(t)}f", *t)), "componentType": 5126, "count": len(t), "type": "SCALAR", "min": [min(t)], "max": [max(t)]})
                accessors.append({"bufferView": view(out), "count": len(t), **acc})
                samplers_a.append({"input": len(accessors) - 2, "output": len(accessors) - 1, "interpolation": "STEP" if interp == 0 else "LINEAR"})
                channels.append({"sampler": len(samplers_a) - 1, "target": {"node": i + 1, "path": path}})
        extra["animations"] = [{"name": "Stand", "channels": channels, "samplers": samplers_a}]
    pts = [(m.verts[local[i]][1], m.verts[local[i]][2], m.verts[local[i]][0]) for i in drawn]
    if moving:
        world: list = []
        for i, (par, _, tracks) in enumerate(bones):
            first = {k: v[2][0] for k, v in tracks.items()}
            t = axes(first["translation"]) if "translation" in first else (0, 0, 0)
            q = quat(first["rotation"]) if "rotation" in first else (0, 0, 0, 1)
            sc = axes(first["scale"]) if "scale" in first else (1, 1, 1)
            local_m = trs(tuple(a + b for a, b in zip(rest[i], t)), (q[1], q[2], q[0], q[3]), sc)
            world.append(mul(world[par], local_m) if par >= 0 else local_m)
        skin_m = [mul(w, trs(tuple(-c for c in piv[i]), (0, 0, 0, 1), (1, 1, 1))) for i, w in enumerate(world)]
        pts = []
        for i in drawn:
            v = m.verts[local[i]]
            p = (v[1], v[2], v[0])
            acc = [0.0, 0.0, 0.0]
            ws = v[3:7] if sum(v[3:7]) else (255, 0, 0, 0)
            for w, j in zip(ws, v[7:11]):
                if w:
                    q3 = apply(skin_m[j], p)
                    acc = [a + w / 255 * b for a, b in zip(acc, q3)]
            pts.append(acc)
    lo3 = [min(p[k] for p in pts) for k in range(3)]
    hi3 = [max(p[k] for p in pts) for k in range(3)]
    c = [(a + b) / 2 for a, b in zip(lo3, hi3)]
    frame = [round(v, 3) for v in (*c, *((b - a) / 2 for a, b in zip(lo3, hi3)))]  # centre, half width/height/depth

    used = ["EXT_texture_webp"] + (["KHR_materials_unlit"] if any("extensions" in x for x in materials) else [])
    gltf = {
        "asset": {"version": "2.0", "generator": "Dungeon Quest Atlas models.py"},
        "extensionsUsed": used, "extensionsRequired": ["EXT_texture_webp"],
        "scene": 0, "scenes": [{"nodes": roots}], "nodes": nodes,
        "meshes": [{"primitives": meshes_prims}], **extra,
        "materials": materials, "textures": textures_, "images": images, "samplers": samplers,
        "accessors": accessors, "bufferViews": views, "buffers": [{"byteLength": len(buf)}],
    }
    js = json.dumps(gltf, separators=(",", ":")).encode()
    js += b" " * (-len(js) % 4)
    buf += b"\0" * (-len(buf) % 4)
    total = 12 + 8 + len(js) + 8 + len(buf)
    glb = struct.pack("<4sII", b"glTF", 2, total) + struct.pack("<I4s", len(js), b"JSON") + js + struct.pack("<I4s", len(buf), b"BIN\0") + bytes(buf)
    return glb, frame  # frame: centre x, y, z and half its width, height, depth, in the pose shown


# a slot's item geoset groups: (ItemSlot, GeosetGroup_n) -> the body's geoset group it picks
ITEM_GEOSETS = {
    (4, 0): 8, (4, 1): 10,  # shirt: sleeves, chest
    (5, 0): 8, (5, 1): 10, (5, 2): 13,  # chest: sleeves, chest, robe
    (6, 0): 18,  # belt
    (7, 0): 11, (7, 1): 9, (7, 2): 13,  # legs: pants, knee pads, robe
    (8, 0): 5, (8, 1): 20,  # feet: boots, feet
    (10, 0): 4,  # hands: gloves
    (16, 0): 15,  # back: cape
    (19, 0): 12,  # tabard
}


class Characters:
    """A humanoid NPC as the game builds it: its race and sex's character model, the body texture baked
    for that NPC (skin, face and clothes in one), its customization (hair style and colour) and the
    geosets its items switch (boots, gloves, robe...). Helms, shoulders and weapons are attachments: not yet."""

    def __init__(self, cdi: dict, cmd: dict):
        self.cdi, self.cmd = cdi, cmd
        self.extra = {r["ID"]: r for r in table("CreatureDisplayInfoExtra")}
        self.models = {(r["ChrRacesID"], r["Sex"]): r["ChrModelID"] for r in table("ChrRaceXChrModel")}
        self.chr = {r["ID"]: r for r in table("ChrModel")}
        self.tex = {}
        for r in table("TextureFileData"):
            self.tex.setdefault(r["MaterialResourcesID"], int(r["FileDataID"]))
        self.options: dict[str, list[str]] = {}
        for r in table("CreatureDisplayInfoOption"):
            self.options.setdefault(r["CreatureDisplayInfoExtraID"], []).append(r["ChrCustomizationChoiceID"])
        self.elements: dict[str, list[dict]] = {}
        for r in table("ChrCustomizationElement"):
            self.elements.setdefault(r["ChrCustomizationChoiceID"], []).append(r)
        self.geosets = {r["ID"]: (int(r["GeosetType"]), int(r["GeosetID"])) for r in table("ChrCustomizationGeoset")}
        self.materials = {r["ID"]: r for r in table("ChrCustomizationMaterial")}
        self.target_type: dict[str, int] = {}
        for r in table("ChrModelTextureLayer"):
            for k in ("ChrModelTextureTargetID_0", "ChrModelTextureTargetID_1"):
                if r[k] != "0":
                    self.target_type.setdefault(r[k], int(r["TextureType"]))
        self.items: dict[str, list[tuple[int, str]]] = {}
        for r in table("NPCModelItemSlotDisplayInfo"):
            self.items.setdefault(r["NpcModelID"], []).append((int(r["ItemSlot"]), r["ItemDisplayInfoID"]))
        self.idi = {r["ID"]: r for r in table("ItemDisplayInfo")}

    def dress(self, extra_id: int):
        e = self.extra[str(extra_id)]
        chr_model = self.chr[self.models[(e["DisplayRaceID"], e["DisplaySexID"])]]
        fid = int(self.cmd[int(self.cdi[int(chr_model["DisplayID"])]["ModelID"])]["FileDataID"])
        bake = self.tex.get(e["HDBakeMaterialResourcesID"]) or self.tex.get(e["BakeMaterialResourcesID"])
        typed = {1: bake} if bake else {}
        chosen: dict[int, int] = {}
        picks = set(self.options.get(str(extra_id), []))
        for choice in picks:
            for el in self.elements.get(choice, []):
                if el["RelatedChrCustomizationChoiceID"] not in ("0", *picks):
                    continue
                if el["ChrCustomizationGeosetID"] in self.geosets:
                    group, value = self.geosets[el["ChrCustomizationGeosetID"]]
                    chosen[group] = value
                mat = self.materials.get(el["ChrCustomizationMaterialID"])
                if mat:
                    kind = self.target_type.get(mat["ChrModelTextureTargetID"])
                    if kind and kind != 1 and mat["MaterialResourcesID"] in self.tex:
                        typed.setdefault(kind, self.tex[mat["MaterialResourcesID"]])  # hair and the like; the body is baked
        for slot, item in self.items.get(str(extra_id), []):
            info = self.idi.get(item)
            for n in range(6):
                group = ITEM_GEOSETS.get((slot, n))
                value = int(info[f"GeosetGroup_{n}"]) if info else 0
                if group and value:
                    chosen[group] = 1 + value

        def show(g: int) -> bool:
            group, value = divmod(g, 100)
            if group == 0:
                return value == 0 or value == chosen.get(0)  # the body, and the chosen hair style
            return value == chosen.get(group, 1)

        return fid, typed, show


def boss_displays() -> set[int]:
    data = json.loads((ROOT / "src" / "data" / "atlas" / "addon.json").read_text())
    found: set[int] = set()

    def walk(o):
        if isinstance(o, dict):
            if isinstance(o.get("display"), int):
                found.add(o["display"])
            for v in o.values():
                walk(v)
        elif isinstance(o, list):
            for v in o:
                walk(v)

    walk(data)
    return found


def main() -> None:
    cdi = {int(r["ID"]): r for r in table("CreatureDisplayInfo")}
    cmd = {int(r["ID"]): r for r in table("CreatureModelData")}
    geo: dict[int, dict[int, int]] = {}
    for r in table("CreatureDisplayInfoGeosetData"):
        geo.setdefault(int(r["CreatureDisplayInfoID"]), {})[int(r["GeosetIndex"]) + 1] = int(r["GeosetValue"])
    # which boss models are humanoids (a character model): the page crops their portrait to head and shoulders
    kinds = {d: ("humanoid" if cdi[d]["ExtendedDisplayInfoID"] != "0" else "creature") for d in sorted(boss_displays()) if d in cdi}
    (ROOT / "src" / "data" / "atlas" / "models.json").write_text(json.dumps(kinds, indent=1) + "\n")
    # each model's framing in the pose the page shows, so every boss fills the stage alike
    frames_file = ROOT / "src" / "data" / "atlas" / "frames.json"
    frames = json.loads(frames_file.read_text()) if frames_file.exists() else {}
    asked = [int(a) for a in sys.argv[1:]]
    done = 0
    chars = None  # the humanoid tables, loaded when the first humanoid comes
    for d in sorted(asked or boss_displays()):
        out = OUT / f"npc-{d}.glb"
        info = cdi.get(d)
        if not info or (out.exists() and not asked):
            continue
        try:
            if info["ExtendedDisplayInfoID"] != "0":
                if chars is None:
                    chars = Characters(cdi, cmd)
                fid, typed, show = chars.dress(int(info["ExtendedDisplayInfoID"]))
            else:
                fid = int(cmd[int(info["ModelID"])]["FileDataID"])
                typed = {11 + i: int(info[f"TextureVariationFileDataID_{i}"]) for i in range(3)}
                wanted = geo.get(d, {})
                show = lambda g, wanted=wanted: shown(g, wanted)
            glb, frames[str(d)] = to_gltf(M2(fid), typed, show)
            out.write_bytes(glb)
            done += 1
        except (AssertionError, KeyError, RuntimeError, OSError, struct.error) as e:
            print(f"display {d}: {e}")
    frames_file.write_text(json.dumps(dict(sorted(frames.items(), key=lambda kv: int(kv[0]))), indent=1) + "\n")
    print(f"{done} models written to {OUT}")


if __name__ == "__main__":
    main()
