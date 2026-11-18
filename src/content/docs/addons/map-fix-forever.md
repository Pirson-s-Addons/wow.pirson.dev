---
title: "Map Fix Forever"
description: "Fixes the green world map in non-English clients with the original map art."
addon: mf
sidebar:
  order: 9
---

## Screenshots

![Before: green map](/images/addons/map-fix-forever/mapnofixed-png-e9fdf6.webp)

![After: original map art](/images/addons/map-fix-forever/mapfixed-png-c4b49f.webp)

## The problem

In WoW Forever (1.60.1), the new world maps (the world map, Kalimdor, Durotar, Zephras Isle, Hyjal and the other redrawn zones) only shipped for **English** clients. In any other language the client can't find them (`Logs/AsyncFile.log`: *"Can't find file in build manifest"*) and draws them **solid green**, both the zone map and the explored areas.

## What it does

**Map Fix Forever** ships the **original map textures** of the English client (build 1.60.1.69913, 1554 textures in 55 map folders) and swaps them in whenever the game draws one of those maps. Your map looks exactly like it does in English, explored areas included.

- Nothing to set up: install it and open the map.
- On English clients the world map is left alone (only the minimap fix below runs).
- Only post-hooks: Blizzard's map code is never replaced.

**Grey minimap in Orgrimmar and Stormwind** (build 1.60.1.70291, every language): inside those two cities the minimap turns light grey and black. The addon hides the broken city minimap and draws the ground minimap tiles the game already has underneath, following your position, zoom and minimap rotation. Icons stay on top. Outside those cities nothing changes.

## Commands

- `/mapfix` — status: how many original textures are being shown.
- `/mapfix on` / `/mapfix off` — turn the fix on or off.
- `/mapfix minimap` — turn the grey minimap fix on or off.

## Installation

1. Download the zip from the [latest release](https://github.com/Pirson-s-Addons/MapFixForever/releases/latest).
2. Extract the `MapFixForever` folder into `World of Warcraft/_forever_/Interface/AddOns/`.
3. Restart WoW and enable the addon.

It only loads on WoW Forever: its TOCs are `MapFixForever_Camelot.toc` (`Camelot` is Forever's game type) and `MapFixForever.toc`, an identical copy the CurseForge app needs to detect it.

## Notes

- The addon is large (~52 MB zipped) because it carries the map art.
- The map textures belong to Blizzard Entertainment. They are included only to show non-English clients the same map English clients already have. If Blizzard ships the maps for every language, this addon is no longer needed.
