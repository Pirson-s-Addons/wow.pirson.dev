---
title: "Azeroth AI"
description: "An in-game chatbot for WoW Forever: ask about the game without alt-tabbing."
addon: ai
sidebar:
  order: 20
---

## What it does
Open the chat window with `/aai` and ask in English or Spanish. Azeroth AI answers in the language you asked in, using your character: level, faction, class, zone and experience.

| You ask | It answers |
|---|---|
| Where should I level? | The best zones for your level and faction, plus a dungeon for your level |
| Which dungeon should I run? | The dungeons that fit your level |
| Where is BFD? | Its levels and entrance, and it marks it on your map if you say "yes" |
| How much XP do I need? | Experience left for the next level, and your rested XP |
| Where is my trainer? | The nearest trainer for your class, with coordinates and waypoint (with Questie) |
| Where is the flight master / inn / bank / auction house? Where can I repair? | The nearest one, with coordinates and waypoint (with Questie) |
| How do I level my profession? | The profession ranks and which one your level allows |
| Where do I turn in [quest]? Who gives it? What does it ask for? | Shift+click the quest in your log: who gives it, where to turn it in and your progress |
| What does LFM mean? | The meaning of chat slang (needs [WoW Translator](https://www.curseforge.com/wow/addons/wow-translator)) |

It works without internet: everything it knows ships inside the addon. Questions it can't answer yet are saved only on your PC (`AzerothAIDB`) so future versions can learn them. The interface is translated into 20 languages.

**Also with a gamepad (Xbox, PlayStation...)**: move between buttons with the D-pad, A presses, B closes, and a bar under the window shows what each button does. Next to the chat window, **quick questions** sent with one press and an **on-screen keyboard** to write your own.

## Screenshots

![Where to level, marked on your map](/images/addons/azeroth-ai/azerotai-textarea2-png-258a71.webp)

![Your trainer, wherever you are](/images/addons/azeroth-ai/azerotai-textarea3-png-359cc5.webp)

![Your spec's rotation, step by step](/images/addons/azeroth-ai/azerotai-textarea4-png-83b577.webp)

![Its own tab in the game chat](/images/addons/azeroth-ai/azerotai-textarea-png-bb7d8c.webp)

![With a gamepad: quick questions and an on-screen keyboard](/images/addons/azeroth-ai/azerotai-mando-png-aea9b0.webp)

![Distances, tone and when it talks](/images/addons/azeroth-ai/menu-ai-png-c8c71c.webp)

## Installation
1. Extract the `AzerothAI` folder into `World of Warcraft/_forever_/Interface/AddOns/`.
2. Restart WoW and enable the addon.

## Usage
- `/aai` — open or close the chat window (also from the addon compartment by the minimap).
- `/aai <question>` — ask straight away.
- `/aai tab` — bring back the Azeroth AI tab in the game chat (with Chattynator, it explains how to add it as a special tab).
- `/aai clear` — clear the conversation.
- `/aai sources` — list the addons it reads data from.
- `/aai config` — open the About panel.

## The more addons, the more it knows
Azeroth AI reads data from other addons you have installed, at runtime and without copying their databases. `/aai sources` shows which ones it found.

| Addon | What Azeroth AI learns from it |
|---|---|
| Dungeon Quest Atlas | Quests, bosses and loot of every dungeon, who drops an item, raid keys |
| [WoW Translator](https://www.curseforge.com/wow/addons/wow-translator) | The meaning of thousands of chat slang terms |
| GatherRadar | Where herbs, ore and treasures are |
| Questie | Quests near you and the nearest trainers, flight masters, innkeepers, repair vendors, bankers and auctioneers |
| Polestar | Your guide's next step and Forever's zone levels |
| Deadly Boss Mods | The abilities to watch out for on each boss |

Whenever it tells you where something is, it offers to mark it on your map (**Yes / No**). It uses its own arrow, minimap and world map pin, or TomTom's if you have it.

---

**Author**: Pirson · [GitHub](https://github.com/Pirson-s-Addons) · [CurseForge](https://www.curseforge.com/members/pirson/projects) · All rights reserved
