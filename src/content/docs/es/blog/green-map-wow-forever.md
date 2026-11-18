---
title: "Cómo arreglar el mapa verde en WoW Forever"
description: "Por qué el mapa del mundo de WoW Forever sale verde en español y otros idiomas, y cómo verlo como en el cliente en inglés en un minuto."
date: 2026-11-18
authors: pirson
tags: [WoW Forever, Mapa]
excerpt: "Si juegas WoW Forever en español, el mapa del mundo y las zonas nuevas salen en verde. No es tu tarjeta gráfica: faltan archivos en el cliente."
draft: true
---

Si juegas **WoW Forever en español** (o en cualquier idioma que no sea el inglés), habrás visto que el mapa del mundo, Kalimdor, Durotar y el resto de zonas redibujadas salen **en verde**. No es tu tarjeta gráfica ni tu instalación.

## Por qué pasa

En WoW Forever 1.60.1 los mapas nuevos solo se publicaron para el cliente en **inglés**. En los demás idiomas el juego no encuentra esos archivos (en `Logs/AsyncFile.log` verás *"Can't find file in build manifest"*) y los pinta en verde, tanto el mapa de la zona como las zonas exploradas.

## La solución

[Map Fix Forever](/es/addons/map-fix-forever/) lleva las texturas originales del mapa del cliente en inglés y las coloca cada vez que el juego dibuja uno de esos mapas. No hay que configurar nada:

1. Instálalo desde CurseForge o a mano ([cómo instalar addons](/es/install/)).
2. Entra en el juego y abre el mapa.

De paso arregla el **minimapa gris de Orgrimmar y Ventormenta**, que sale en gris claro y negro en todos los idiomas.

## Preguntas rápidas

- **¿Cambia algo en el cliente en inglés?** No toca el mapa del mundo; solo corre el arreglo del minimapa.
- **¿Por qué pesa tanto?** Unos 52 MB, porque lleva el arte del mapa (1554 texturas).
- **¿Hará falta siempre?** No. Si Blizzard publica los mapas en todos los idiomas, el addon deja de ser necesario.
