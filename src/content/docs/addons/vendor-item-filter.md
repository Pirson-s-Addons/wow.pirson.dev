---
title: "Vendor Item Filter"
description: "Filter vendor items by armor type, slot, weapon type, jewelry and more."
addon: vf
sidebar:
  order: 15
---

## Screenshots

![Vendor with no filter](/images/addons/vendor-item-filter/menu-no-filter-png-78b45f.webp)

![Armor filter](/images/addons/vendor-item-filter/menu-filter-png-c3779f.webp)

![Weapons filter](/images/addons/vendor-item-filter/menu-weapons-png-35e6e4.webp)

![Weapons menu](/images/addons/vendor-item-filter/menu-weapon-png-8c2e45.webp)

![Armor menu](/images/addons/vendor-item-filter/menu-armor-png-9ce1be.webp)

## What it does

**Vendor Item Filter** adds a dropdown to the top of the merchant window. Pick a category and only the matching items stay visible, so you can find what you need on vendors with long lists.

## Features

- **Armor → Types**: Cloth, Leather, Mail or Plate, either the whole type or a single slot (Head, Shoulder, Chest, Waist, Legs, Feet, Wrist, Hands).
- **Armor → Jewelry**: Neck, Rings, Trinkets.
- **Armor → Other**: Cloaks, Relics (heirloom-quality items), Shields, Off Hand, Shirts, Tabards.
- **Weapons**: One-Handed (with Main Hand, Off Hand, Fist Weapons and Shields), Two-Handed, Ranged, and Other (Fishing Poles).
- **All** shows everything again.
- Remembers the last filter you used between sessions.
- Moves the dropdown to the bottom-left of the window when ElvUI is loaded.
- Translated to the main client languages.

## Usage

- Open any vendor and choose a filter from the dropdown at the top of the window.
- There are no slash commands or options panel.

## Installation

1. Download the zip from the [latest release](https://github.com/Pirson-s-Addons/VendorItemFilter/releases/latest) or from [CurseForge](https://www.curseforge.com/wow/addons/vendor-item-filter).
2. Extract the `VendorItemFilter` folder into:
   - `World of Warcraft/_classic_/Interface/AddOns/` (Mists of Pandaria Classic)
   - `World of Warcraft/_forever_/Interface/AddOns/` (WoW Forever)
3. Restart WoW and enable the addon.

## Notes

- The filter works page by page: hidden items leave their slot empty instead of moving the rest up.
- Items whose data the game has not loaded yet are shown until it arrives.
