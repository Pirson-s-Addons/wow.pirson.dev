# Dungeon floor maps of the addon (Art/Maps/<floor>_<1-12>.blp|tga: 12 tiles of 256x256, 4 across and
# 3 down, of which 1002x668 is drawn) stitched into public/atlas/maps/<floor>.webp. The floor names are
# the `id` of each floor in Data/Maps.lua. Addon repo: DQA_DIR (default ../DungeonQuestAtlas).
# Usage: npm run atlas:maps
import os
import re
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
SRC = Path(os.environ.get("DQA_DIR", ROOT.parent / "DungeonQuestAtlas")) / "Art" / "Maps"
OUT = ROOT / "public" / "atlas" / "maps"
OUT.mkdir(parents=True, exist_ok=True)

floors = {}
for f in SRC.iterdir():
    m = re.fullmatch(r"(.+)_(\d+)\.(blp|tga)", f.name)
    if m:
        floors.setdefault(m[1], {})[int(m[2])] = f

for floor, tiles in sorted(floors.items()):
    assert sorted(tiles) == list(range(1, 13)), f"{floor}: tiles {sorted(tiles)}"
    sheet = Image.new("RGB", (1024, 768))
    for n, f in tiles.items():
        sheet.paste(Image.open(f).convert("RGB"), (((n - 1) % 4) * 256, ((n - 1) // 4) * 256))
    sheet.crop((0, 0, 1002, 668)).save(OUT / f"{floor}.webp", quality=82, method=6)

# Card and lore art of the Forever dungeons and raids (Art/UI/card_*.tga, lore_*.tga, 512x256)
ART = ROOT / "public" / "atlas" / "art"
ART.mkdir(parents=True, exist_ok=True)
art = sorted((SRC.parent / "UI").glob("[cl][ao][r]*_*.tga"))
for f in art:
    Image.open(f).convert("RGB").save(ART / f"{f.stem}.webp", quality=82, method=6)

# the addon's logo and map pin
for f in sorted((SRC.parent.parent / "img").glob("*.tga")):
    Image.open(f).save(ART / f"{f.stem}.webp", quality=90, method=6)

print(f"{len(floors)} floors -> {OUT}, {len(art)} cards -> {ART}")
