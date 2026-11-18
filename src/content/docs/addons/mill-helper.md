---
title: "Mill Helper"
description: "Mill herbs in one click for Inscription. Lists the millable herbs in your bags."
addon: mh
sidebar:
  order: 13
---

## Screenshots

![Menu](/images/addons/mill-helper/mh-menu-png-849e23.webp)

## What it does

Mill Helper scans your bags for millable herbs and lists them in a small window. Tick an herb and a mill button appears next to it: each click casts Milling on that herb, so you can work through a whole stack without opening your spellbook or writing macros yourself.

## Features

- Lists every millable herb in your bags with its stack count, grouped by expansion (Classic to Mists of Pandaria).
- One checkbox per herb: ticking it creates a `Mill_<HerbName>` macro and shows a one-click mill button; unticking hides the button and deletes the macro.
- Herbs with fewer than 5 units are greyed out, with a tooltip explaining why.
- The list refreshes automatically as your bags change.
- Movable, scrollable window.
- Minimap button (LibDBIcon / LibDataBroker).
- Translated into 20 languages.

## Usage

- **Left click** the minimap button to open or close the window.
- **Right click** the minimap button to print a short help line in chat.
- Tick an herb, then click the button next to it once per mill.

## Installation

1. Download the zip from the [latest release](https://github.com/Pirson-s-Addons/MillHelper/releases/latest) or from [CurseForge](https://www.curseforge.com/wow/addons/mill-helper).
2. Extract the `MillHelper` folder into `World of Warcraft/_classic_/Interface/AddOns/` (Mists, Cataclysm and Wrath Classic all use `_classic_`).
3. Restart WoW and enable the addon.

## Notes

- Each ticked herb uses one slot of your general macros. Leave a free slot, and untick the herb when you are done so the macro is removed.
