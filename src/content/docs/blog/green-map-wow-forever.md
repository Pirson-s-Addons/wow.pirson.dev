---
title: "How to fix the green map in WoW Forever"
description: "Why the WoW Forever world map is green in non-English clients, and how to see it like the English client in one minute."
date: 2026-11-18
authors: pirson
tags: [WoW Forever, Map]
excerpt: "If you play WoW Forever in any language but English, the world map and the new zones are green. It is not your graphics card: the client is missing files."
draft: true
---

If you play **WoW Forever in a language other than English** (German, French, Spanish...), the world map, Kalimdor, Durotar and the other redrawn zones show up **green**. It is not your graphics card or your install.

## Why it happens

In WoW Forever 1.60.1 the new maps were only shipped for the **English** client. In every other language the game cannot find those files (`Logs/AsyncFile.log` says *"Can't find file in build manifest"*) and paints them green, both the zone map and the explored areas.

## The fix

[Map Fix Forever](/addons/map-fix-forever/) ships the original map textures of the English client and puts them in place whenever the game draws one of those maps. Nothing to set up:

1. Install it from CurseForge or by hand ([how to install addons](/install/)).
2. Log in and open the map.

It also fixes the **grey minimap in Orgrimmar and Stormwind**, which shows light grey and black in every language.

## Quick answers

- **Does it change anything in the English client?** It leaves the world map alone; only the minimap fix runs.
- **Why is it so big?** About 52 MB, because it ships the map art (1,554 textures).
- **Will I always need it?** No. If Blizzard ships the maps in every language, the addon is no longer needed.
