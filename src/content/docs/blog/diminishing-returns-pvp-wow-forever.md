---
title: "Diminishing returns (DR) in WoW Forever PvP"
description: "How crowd control diminishing returns work in WoW Forever: 100%, 50%, 25%, immune and the 18-second reset."
date: 2026-11-18
authors: pirson
tags: [WoW Forever, PvP]
excerpt: "The second stun lasts half as long, the third a quarter and the fourth does nothing. This is how DR works and how to see it on screen."
draft: true
---

In PvP, every **crowd control of the same kind** a player takes lasts less than the one before. That is **diminishing returns**, or **DR**.

## The rules

| CC in a row | Duration |
| --- | --- |
| 1st | 100% |
| 2nd | 50% |
| 3rd | 25% |
| 4th | Immune |

The count **resets 18 seconds** after the last CC of that kind ends. Each category (stuns, fears, silences, roots...) keeps its own count.

## Why it matters

A stun on a target already at 25% barely lasts, and on an immune target it is wasted. Knowing where each category stands tells you when to chain your CC and when to wait for the reset.

## How to see it in WoW Forever

WoW Forever hides the combat log from addons and its own DR system is turned off. [DR Tracker Forever](/addons/dr-tracker-forever/) works it out from your casts and your group's, and shows it as icons on your target, focus and player frames:

- The **border and text** tell how long the **next** CC will last (50%, 25%, 0%).
- The **swirl** shows when it resets.
- `/drf test` shows sample icons for 20 seconds, so you can place them with `/drf unlock`.
