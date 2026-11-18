---
title: "Gather Radar"
description: "Herbs, ore, treasure and fishing pools on the minimap and world map, with icons."
addon: gr
sidebar:
  order: 7
---

## Screenshots

![Nodes on the minimap](/images/addons/gather-radar/minimap-show-png-6dcff5.webp)

![Choose what to show](/images/addons/gather-radar/map-options-png-41928b.webp)

![Ore veins](/images/addons/gather-radar/ore-png-801703.webp)

![Herbs and the skill they need](/images/addons/gather-radar/herb-png-417108.webp)

![Treasure chests](/images/addons/gather-radar/chest-png-1f133d.webp)

![Fishing pools](/images/addons/gather-radar/fish-png-91af6b.webp)

## What it does

**GatherRadar** turns Find Herbs, Find Minerals, Find Treasure and Find Fish into a real gathering radar. Every saved node near you shows on the minimap as a **hollow ring** colored by your chance of a skill-up, for the professions you know: if the node is there, the tracking dot shows inside the ring. What your party finds shows with the **icon of what it gives** (Peacebloom, Copper Ore, a chest...), bigger and glowing. Every node you gather is **remembered** on the **world map**, so you can plan your farming route at a glance.

## Features

- **Minimap rings**: every saved herb, vein, chest and fishing pool around you, colored like the profession window (orange, yellow, green, gray; red if your skill is too low). What your party finds shows with its real item icon.
- **Remembers every node**: the ones you gather (exact position) and the ones your party finds, to find them later on the world map.
- **World map pins** for every saved node of the zone. Shift + right-click a pin to delete it.
- **No duplicates**: two nodes of the same kind closer than 15 yards (you choose) are the same place and only one is kept.
- **Known nodes included**: one click imports the WoW Forever herbs, ore and treasure (Wowhead data from GatherMate2_Data) and fishing pools you are missing, the kinds you choose, no other addon needed. Your own nodes are never replaced.
- **Map filter**: a round button on the world map chooses which kinds (herbs, ore, treasure, fishing pools) are shown on the minimap and the world map. The arrow follows it too.
- **3D arrow to the nearest node** with its name and distance, preferring what is here now. It skips the node you just passed for 5 minutes. Turn it on or off from the world map button.
- **Party sharing**: group members with GatherRadar see the nodes you find, and you see theirs, live.
- **Session panel**: nodes gathered and materials obtained, with icons, totals and per hour.
- **Works in your language**: herbs, ore, treasure and fishing pools are recognized by their in-game name in every official language; nodes new to Forever are learned as you gather.
- Settings in the game's own **Options → AddOns** panel, 20 languages, no libraries.

## Usage

- Turn on **Find Herbs**, **Find Minerals**, **Find Treasure** or **Find Fish** in the minimap tracking menu. GatherRadar does the rest.
- `/gr` opens the settings. `/gr session` shows the session panel, `/gr arrow` the arrow, `/gr import` imports the Wowhead nodes.
- **Options → AddOns → GatherRadar → General**: what to show and where, the radar and the icon sizes.
- **Options → AddOns → GatherRadar → Data**: saved nodes, duplicates, import (choose the kinds), delete and forget everything.

## Installation

1. Download the zip from [CurseForge](https://www.curseforge.com/wow/addons/gather-radar) or the [latest release](https://github.com/Pirson-s-Addons/GatherRadar/releases/latest).
2. Extract the `GatherRadar` folder into `World of Warcraft/_forever_/Interface/AddOns/`.
3. Restart WoW and enable the addon.

## Notes

- Addons cannot ask the game where nodes are, and since Blizzard's API changes they cannot read the minimap at all (the tracking dot's name is secret, even under your own mouse). A remembered node is only a ring: an empty ring means someone may have gathered it.
- Fishing pools come from the import and your party only (fishing loot comes from the bobber, not the pool, and the minimap cannot be read).
- Nodes new to WoW Forever (Cold Iron Deposit, Dreamroot...) are recognized in English; in other languages their name is learned the first time you gather them. Herbs with an extra word in their name (Wilted Peacebloom) count as the herb.

## For addon authors

### Public API

Read-only, versioned, always returns copies. Add `## OptionalDeps: GatherRadar` to your TOC and call it after `PLAYER_LOGIN`. Coordinates are 0-100 (like TomTom); node IDs are GatherMate2's.

```lua
local api = GatherRadarAPI
if api and api.version == 1 then
    api.KINDS                        -- { "herb", "ore", "treasure", "fish" }
    api.FindNode("Copper Vein")      -- nodeID, kind (English or client language)
    api.GetNodeInfo(201)             -- { nodeID, kind, name, englishName, item, skill }
    api.GetNodes(1426, "ore")        -- { { x, y, nodeID }, ... } known on that map
    api.GetMapsForNode(201)          -- { { mapID, count }, ... } most nodes first
    api.GetNearest("herb")           -- { mapID, x, y, nodeID, yards } or nil
    api.HasProfession("ore")         -- true if the player can gather it
end
```
