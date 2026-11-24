# The WoW Forever client as wago.tools serves it: game tables (db2 as CSV), file ids by path, and files.
# Everything is cached in .cache/wago/ (by file id), so a rerun only fetches what is new.
import csv
import html
import io
import json
import re
import struct
import time
import urllib.parse
import urllib.request
from pathlib import Path
from PIL import Image

BUILD = "1.60.1.71037"  # WoW Forever on wago.tools (product "wowf"); bump with the client
ROOT = Path(__file__).resolve().parents[2]
CACHE = ROOT / ".cache" / "wago"
CACHE.mkdir(parents=True, exist_ok=True)
UA = {"User-Agent": "atlas-fetch"}


def get(url: str) -> bytes:
    for attempt in range(4):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=90) as r:
                return r.read()
        except Exception as e:  # network hiccup: wait and retry, then give up loudly
            if attempt == 3:
                raise RuntimeError(f"{url}: {e}")
            time.sleep(3 * (attempt + 1))
    raise AssertionError


def table(name: str) -> list[dict]:
    f = CACHE / f"{name}-{BUILD}.csv"
    if not f.exists():
        f.write_bytes(get(f"https://wago.tools/db2/{name}/csv?build={BUILD}"))
    return list(csv.DictReader(io.StringIO(f.read_text(encoding="utf-8"))))


def fdid_of(path: str) -> int:
    """File id of a client path, from the wago.tools file search (its page embeds the results)."""
    path = path.lower().replace("\\", "/")
    if not path.endswith((".blp", ".tga")):
        path += ".blp"
    page = get("https://wago.tools/files?" + urllib.parse.urlencode({"search": path})).decode("utf-8")
    data = json.loads(html.unescape(re.search(r'data-page="([^"]*)"', page).group(1)))
    for f in data["props"]["files"]["data"]:
        if f["filename"] == path:
            return int(f["fdid"])
    raise LookupError(f"not on wago.tools: {path}")


def texture(fdid: int) -> Image.Image:
    f = CACHE / f"{fdid}.blp"
    if not f.exists():
        f.write_bytes(get(f"https://wago.tools/api/casc/{fdid}?download&version={BUILD}"))
    data = f.read_bytes()
    # BLP2 with encoding 3 (raw BGRA, the newer atlases) is not read by this Pillow: decode the first mip
    if data[:4] == b"BLP2" and data[8] == 3:
        w, h = struct.unpack_from("<II", data, 12)
        offset = struct.unpack_from("<I", data, 20)[0]
        return Image.frombytes("RGBA", (w, h), data[offset : offset + w * h * 4], "raw", "BGRA")
    return Image.open(f).convert("RGBA")


def file(fdid: int) -> bytes:
    """A client file by id (models, skins, textures), cached."""
    f = CACHE / f"{fdid}.bin"
    if not f.exists():
        f.write_bytes(get(f"https://wago.tools/api/casc/{fdid}?download&version={BUILD}"))
    return f.read_bytes()

