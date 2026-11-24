# The game's own UI pieces for the Atlas replica (frame, book, tabs, buttons, tooltip...), from the WoW
# Forever client files that wago.tools serves, cut and saved as public/atlas/ui/<name>.webp.
# The list is scripts/atlas/ui-assets.json: each entry is one of
#   {"name": "...", "file": "interface/.../x.blp"}                      the whole texture
#   {"name": "...", "file": "...", "coords": [left, right, top, bottom]}  a part, 0-1 like SetTexCoord
#   {"name": "...", "atlas": "UI-EJ-Classic"}                           an atlas member (UiTextureAtlasMember)
# Downloads are cached in .cache/wago/ (by file id), so a rerun only fetches what is new.
# Usage: npm run atlas:ui
import json
import sys
from pathlib import Path
from PIL import Image

sys.path.insert(0, str(Path(__file__).parent))  # run with python -I: the helpers next to this file
from wago import ROOT, table, fdid_of, texture

OUT = ROOT / "public" / "atlas" / "ui"
OUT.mkdir(parents=True, exist_ok=True)

manifest = json.loads((ROOT / "scripts" / "atlas" / "ui-assets.json").read_text())
# an atlas name can appear more than once (other canvases): the first one is the game's default
members: dict[str, dict] = {}
for m in table("UiTextureAtlasMember") if any("atlas" in a for a in manifest) else []:
    members.setdefault(m["CommittedName"].lower(), m)
atlases = {a["ID"]: a for a in table("UiTextureAtlas")} if members else {}
ids: dict[str, int] = {}
done = 0
for a in manifest:
    out = OUT / f"{a['name']}.webp"
    if out.exists() and "--all" not in sys.argv:
        continue
    if "atlas" in a:
        m = members[a["atlas"].lower()]
        img = texture(int(atlases[m["UiTextureAtlasID"]]["FileDataID"]))  # the atlas sheet
        box = tuple(int(m[k]) for k in ("CommittedLeft", "CommittedTop", "CommittedRight", "CommittedBottom"))
    else:
        try:
            fid = ids.get(a["file"]) or fdid_of(a["file"])
            ids[a["file"]] = fid
            img = texture(fid)
        except (LookupError, RuntimeError, OSError) as e:
            if not a.get("optional"):
                raise
            print(f"skipped {a['name']}: {e}")  # not in this client: the page falls back
            continue
        l, r, t, b = a.get("coords", [0, 1, 0, 1])
        box = (round(l * img.width), round(t * img.height), round(r * img.width), round(b * img.height))
    piece = img.crop(box)
    assert piece.width > 0 and piece.height > 0, a
    piece.save(out, lossless=True) if a.get("lossless") else piece.save(out, quality=90, method=6)
    done += 1

print(f"{done} UI pieces written to {OUT} ({len(manifest)} in the list)")


# --- the main window's frame in one picture (PortraitFrameTemplate with Forever's metal), at 2x ---
# NineSlice offsets (logical px, Blizzard_SharedXML NineSliceLayouts + Camelot overrides): TL -13,16;
# TR 4-2,16; BL -13,-8; BR 4-2,-8. Edges span between the corners at the corners' own height/width.
def piece(n: str) -> Image.Image:
    return Image.open(OUT / f"{n}.webp").convert("RGBA")


S, W, H, M = 2, 797 * 2, 492 * 2, 60  # scale, frame size, margin for the overhanging corners
win = Image.new("RGBA", (W + 2 * M, H + 2 * M), (0, 0, 0, 0))
rock = piece("bg-rock")
fill = Image.new("RGBA", (W, H))
for y in range(0, H, rock.height):
    for x in range(0, W, rock.width):
        fill.alpha_composite(rock.crop((0, 0, min(rock.width, W - x), min(rock.height, H - y))), (x, y))
win.alpha_composite(fill, (M, M))
tl, tr, bl, br = (piece(f"frame-corner-{k}") for k in ("tl", "tr", "bl", "br"))
TL = (M - 13 * S, M - 16 * S)
TR = (M + W + 2 * S - tr.width, M - 16 * S)
BL = (M - 13 * S, M + H + 8 * S - bl.height)
BR = (M + W + 2 * S - br.width, M + H + 8 * S - br.height)


def tile(img: Image.Image, x0: int, y0: int, length: int, horizontal: bool) -> None:
    done = 0
    while done < length:
        n = min((img.width if horizontal else img.height), length - done)
        part = img.crop((0, 0, n, img.height) if horizontal else (0, 0, img.width, n))
        win.alpha_composite(part, (x0 + done, y0) if horizontal else (x0, y0 + done))
        done += n


tile(piece("frame-edge-top"), TL[0] + tl.width, TL[1], TR[0] - TL[0] - tl.width, True)
tile(piece("frame-edge-bottom"), BL[0] + bl.width, BL[1], BR[0] - BL[0] - bl.width, True)
tile(piece("frame-edge-left"), TL[0], TL[1] + tl.height, BL[1] - TL[1] - tl.height, False)
tile(piece("frame-edge-right"), TR[0], TR[1] + tr.height, BR[1] - TR[1] - tr.height, False)
for img, at in ((tl, TL), (tr, TR), (bl, BL), (br, BR)):
    win.alpha_composite(img, at)
win.save(OUT / "window.webp", quality=90, method=6)

# The tooltip border (backdrop edge file: 8 pieces of 16 in a row: left, right, top, bottom, then the
# corners TL, TR, BL, BR; top and bottom are stored turned) as a 48x48 nine-slice for CSS border-image
edge = piece("tooltip-border")
p = [edge.crop((i * 16, 0, i * 16 + 16, 16)) for i in range(8)]
nine = Image.new("RGBA", (48, 48))
for img, at in ((p[4], (0, 0)), (p[5], (32, 0)), (p[6], (0, 32)), (p[7], (32, 32)), (p[0], (0, 16)), (p[1], (32, 16))):
    nine.alpha_composite(img, at)
nine.alpha_composite(p[2].transpose(Image.Transpose.ROTATE_270), (16, 0))
nine.alpha_composite(p[3].transpose(Image.Transpose.ROTATE_270), (16, 32))
nine.save(OUT / "tooltip-9slice.webp", lossless=True)
print(f"window frame: {win.width}x{win.height} (2x, margin {M})")
