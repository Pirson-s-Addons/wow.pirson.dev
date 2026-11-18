---
title: How to install WoW addons
description: "Install any World of Warcraft addon in WoW Forever, MoP Classic, Classic or Retail, with the CurseForge app or by hand, and fix the usual problems."
sidebar:
  order: 1
---

There are two ways to install an addon: the **CurseForge app**, which also keeps it updated, or **by hand** from the zip. Both work for every addon on this site.

## With the CurseForge app (recommended)

1. Install the [CurseForge app](https://www.curseforge.com/download/app) and choose **World of Warcraft**.
2. Pick your game version at the top (for example **WoW Forever** or **MoP Classic**).
3. Search for the addon by name and click **Install**.
4. Start the game, or log out and back in if it was open.

The app updates your addons every time a new version comes out.

## By hand

1. Download the zip from the addon's CurseForge page (**Files** tab) or from its GitHub release.
2. Extract it: you get a folder with the addon's name.
3. Move that folder into the `Interface/AddOns` folder of your game version:

| Game version | Folder |
| --- | --- |
| WoW Forever | `World of Warcraft/_forever_/Interface/AddOns/` |
| MoP Classic | `World of Warcraft/_classic_/Interface/AddOns/` |
| Classic Era | `World of Warcraft/_classic_era_/Interface/AddOns/` |
| Retail | `World of Warcraft/_retail_/Interface/AddOns/` |

If the `Interface` or `AddOns` folder does not exist, create it.

4. Start the game, or log out and back in.

## The addon does not show up

- **Check the folder:** the addon's folder must be directly inside `AddOns`, not inside another folder with the same name (`AddOns/MyAddon/MyAddon/` does not load).
- **Enable it:** on the character select screen, click **AddOns** at the bottom left and tick it.
- **"Out of date":** tick **Load out of date AddOns** on that same screen.
- **Wrong game version:** an addon only loads in the versions it was made for. Every addon page on this site lists them under its title.
- **After an update:** log out and back in instead of `/reload`, so the game reads the new files.

Still stuck? Leave a comment on the addon's CurseForge page with your game version, your client language and the error text.
