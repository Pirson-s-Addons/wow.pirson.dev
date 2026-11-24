# The bosses in 3D: each creature model of the WoW Forever client (M2 + its first skin + its textures) as a
# static glTF binary (public/atlas/models/npc-<display id>.glb): the bind pose, no animations, so it is light.
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


def shown(geoset: int, wanted: dict[int, int]) -> bool:
    """Creature geosets: group 0 is the body (all shown); another group shows its chosen value (1 by default)."""
    group, value = divmod(geoset, 100)
    return group == 0 or value == wanted.get(group, 1)


def to_gltf(m: M2, skins: list[int], wanted: dict[int, int]) -> bytes:
    local, tris, subs, batches = m.skin()
    buf = bytearray()
    views, accessors, meshes_prims, images, textures_, materials = [], [], [], [], [], []
    tex_index: dict[int, int] = {}

    def view(data: bytes, target: int | None = None) -> int:
        while len(buf) % 4:
            buf.append(0)
        views.append({"buffer": 0, "byteOffset": len(buf), "byteLength": len(data), **({"target": target} if target else {})})
        buf.extend(data)
        return len(views) - 1

    def tex_of(i: int) -> int | None:
        kind, flags = m.textures[i]
        fid = m.txid[i] if kind == 0 and i < len(m.txid) else (skins[kind - 11] if 11 <= kind <= 13 else 0)
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

    mat_index: dict[tuple, int] = {}
    for b in batches:
        sub_i, mat_i, combo_i = b[3], b[6], b[9]  # skin section, material, texture combo
        sid, level, _, _, istart, icount = subs[sub_i]
        if not shown(sid, wanted):
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
        idx = struct.pack(f"<{icount}H", *tris[start : start + icount])
        accessors.append({"bufferView": view(idx, 34963), "componentType": 5123, "count": icount, "type": "SCALAR"})
        meshes_prims.append({"attributes": {"POSITION": 0, "NORMAL": 1, "TEXCOORD_0": 2}, "indices": len(accessors) - 1, "material": mat_index[key]})

    assert meshes_prims, "nothing to draw"
    used = ["EXT_texture_webp"] + (["KHR_materials_unlit"] if any("extensions" in x for x in materials) else [])
    gltf = {
        "asset": {"version": "2.0", "generator": "Dungeon Quest Atlas models.py"},
        "extensionsUsed": used, "extensionsRequired": ["EXT_texture_webp"],
        "scene": 0, "scenes": [{"nodes": [0]}], "nodes": [{"mesh": 0}],
        "meshes": [{"primitives": meshes_prims}],
        "materials": materials, "textures": textures_, "images": images, "samplers": samplers,
        "accessors": accessors, "bufferViews": views, "buffers": [{"byteLength": len(buf)}],
    }
    js = json.dumps(gltf, separators=(",", ":")).encode()
    js += b" " * (-len(js) % 4)
    buf += b"\0" * (-len(buf) % 4)
    total = 12 + 8 + len(js) + 8 + len(buf)
    return struct.pack("<4sII", b"glTF", 2, total) + struct.pack("<I4s", len(js), b"JSON") + js + struct.pack("<I4s", len(buf), b"BIN\0") + bytes(buf)


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
    asked = [int(a) for a in sys.argv[1:]]
    done = skipped = 0
    for d in sorted(asked or boss_displays()):
        out = OUT / f"npc-{d}.glb"
        info = cdi.get(d)
        if not info or (out.exists() and not asked):
            continue
        if info["ExtendedDisplayInfoID"] != "0":
            skipped += 1  # a humanoid: the dressing room's pipeline
            continue
        skins = [int(info[f"TextureVariationFileDataID_{i}"]) for i in range(3)]
        try:
            out.write_bytes(to_gltf(M2(int(cmd[int(info["ModelID"])]["FileDataID"])), skins, geo.get(d, {})))
            done += 1
        except (AssertionError, KeyError, RuntimeError, OSError, struct.error) as e:
            print(f"display {d}: {e}")
    print(f"{done} models written to {OUT}; {skipped} humanoids left for the character pipeline")


if __name__ == "__main__":
    main()
