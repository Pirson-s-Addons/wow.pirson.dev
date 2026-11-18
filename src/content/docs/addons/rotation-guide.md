---
title: "Rotation Guide"
description: "Your class rotation on WoW Forever, for all 27 specs."
addon: rg
sidebar:
  order: 22
---

## What it does

Highlights the next spell of your rotation on your action bar, for the 9 classes and 27 talent trees of **WoW Forever**.

## Features

- Glows the spell on the Blizzard action bars (stance bar included: paladin auras, warrior stances, druid forms, stealth) and shows it in a movable icon.
- Picks the rotation from the talent tree where you spent the most points.
- Only suggests spells you know, picking your highest rank.
- Works around Forever's hidden combat data: it tracks your own DoTs, buffs and totems from your casts.
- **Heal warning**: when your health drops below a threshold (40 % by default), your self-heal or defensive (Flash Heal, Evasion, Shield Wall...) covers the icon and glows red on your bar. Health is hidden from addons in Forever, so the game itself decides when it shows: the addon never reads your health.
- **Adapts to the situation**: long buffs, weapon imbues and your pet before the pull; big cooldowns saved for elites and bosses; tank trees play their damage tree when solo; AoE, melee/ranged, stealth and shapeshift aware.

## Commands

| Command | What it does |
|---|---|
| `/rg` | Turn on / off |
| `/rg single` | Force single target (ignore AoE rules) |
| `/rg icon` · `/rg glow` | Show / hide the icon or the bar glow |
| `/rg lock` · `/rg reset` | Lock the icon (Shift + drag moves it) / move it back |
| `/rg heal 40` | Heal warning threshold in % (`/rg heal 0` turns it off) |
| `/rg status` | Class, rotation and enemies counted |

## Installation

1. Get it from [CurseForge](https://www.curseforge.com/wow/addons/rotation-guide) or download the zip from the [latest release](https://github.com/Pirson-s-Addons/RotationGuide/releases/latest).
2. Extract the `RotationGuide` folder into the `Interface/AddOns/` folder of your WoW Forever installation.
3. Restart WoW and enable the addon.

## Notes

Healer trees (Holy, Discipline, Restoration) get a damage rotation for levelling: heals depend on group health, which is hidden in combat.

## For addon authors

### Public API

Read-only, versioned and always returns copies. Add `## OptionalDeps: RotationGuide` to your TOC.

```lua
local api = RotationGuideAPI
if api and api.version == 1 then
    api.GetClasses()              -- { "DRUID", "HUNTER", ... }
    api.GetSpecs("PALADIN")       -- { { index = 1, name = "Holy" }, ... }
    api.GetRotation("PALADIN", 3) -- { { spellID, name, conditions = { missing = {...}, aoe = 2, ... } }, ... }
    api.GetHeals("PALADIN")       -- heals/defensives used when health drops
    api.GetPlayerSpec()           -- class, specIndex, specName
    api.GetNext()                 -- spellID now highlighted, heal spellID, heal threshold %
end
```

`conditions` uses the rule fields documented at the top of `Core/Engine.lua`.

### Tests

```bash
uv run --no-project --with lupa python -I Tests/run.py
```
