---
title: "Rendimientos decrecientes (DR) en el PvP de WoW Forever"
description: "Cómo funcionan los rendimientos decrecientes de los controles de masas en WoW Forever: 100 %, 50 %, 25 %, inmunidad y el reinicio de 18 segundos."
date: 2026-11-18
authors: pirson
tags: [WoW Forever, PvP]
excerpt: "El segundo aturdimiento dura la mitad, el tercero un cuarto y el cuarto no hace nada. Así funciona el DR y cómo verlo en pantalla."
draft: true
---

En PvP, cada **control de masas del mismo tipo** que recibe un jugador dura menos que el anterior. Es lo que se llama **rendimientos decrecientes** o **DR** (*diminishing returns*).

## Las reglas

| Control seguido | Duración |
| --- | --- |
| 1.º | 100 % |
| 2.º | 50 % |
| 3.º | 25 % |
| 4.º | Inmune |

El contador se **reinicia 18 segundos** después de que acabe el último control de ese tipo. Cada categoría (aturdimientos, miedos, silencios, raíces...) lleva su propio contador.

## Por qué importa

Si lanzas un aturdimiento sobre un objetivo que ya va por el 25 %, apenas dura nada, y si es inmune lo has malgastado. Saber en qué punto está cada categoría decide cuándo encadenar controles y cuándo esperar al reinicio.

## Cómo verlo en WoW Forever

WoW Forever oculta el registro de combate a los addons y su propio sistema de DR está apagado. [DR Tracker Forever](/es/addons/dr-tracker-forever/) lo calcula con tus lanzamientos y los de tu grupo, y lo muestra con iconos sobre los marcos de tu objetivo, tu foco y el tuyo:

- El **borde y el texto** dicen cuánto durará el **siguiente** control (50 %, 25 %, 0 %).
- La **espiral** marca cuándo se reinicia.
- `/drf test` enseña iconos de ejemplo durante 20 segundos para colocarlos a tu gusto con `/drf unlock`.
