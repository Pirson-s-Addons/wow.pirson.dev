---
title: "Prospect Helper"
description: "Prospecta minerales en un clic para Joyería. Lista los minerales de tus bolsas."
addon: ph
sidebar:
  order: 12
---

## Capturas

![Menú](/images/addons/prospect-helper/ph-menu-png-1f15c9.webp)

## Qué hace

Prospect Helper revisa tus bolsas en busca de menas que se puedan prospectar y las muestra en una pequeña ventana. Marca una mena y aparecerá a su lado un botón de prospectar: cada clic lanza Prospección sobre esa mena, así que puedes acabar con un montón entero sin abrir el libro de hechizos ni escribir macros a mano.

## Funciones

- Lista todas las menas prospectables de tus bolsas con su cantidad, agrupadas por expansión (de Classic a Mists of Pandaria).
- Una casilla por mena: al marcarla se crea la macro `Prospect_<NombreMena>` y aparece un botón para prospectar con un clic; al desmarcarla se oculta el botón y se borra la macro.
- Las menas con menos de 5 unidades aparecen desactivadas, con un tooltip que explica el motivo.
- La lista se actualiza sola cuando cambian tus bolsas.
- Ventana movible y con scroll.
- Botón en el minimapa (LibDBIcon / LibDataBroker).
- Traducido a 20 idiomas.

## Uso

- **Clic izquierdo** en el botón del minimapa para abrir o cerrar la ventana.
- **Clic derecho** en el botón del minimapa para mostrar una breve ayuda en el chat.
- Marca una mena y pulsa el botón de su lado una vez por cada prospección.

## Instalación

1. Descarga el zip desde la [última release](https://github.com/Pirson-s-Addons/ProspectHelper/releases/latest) o desde [CurseForge](https://www.curseforge.com/wow/addons/prospect-helper).
2. Extrae la carpeta `ProspectHelper` en:
   - Mists / Cataclysm / Wrath Classic: `World of Warcraft/_classic_/Interface/AddOns/`
   - TBC Anniversary: `World of Warcraft/_anniversary_/Interface/AddOns/`
3. Reinicia WoW y activa el addon.

## Notas

- Cada mena marcada ocupa un hueco de tus macros generales. Deja uno libre y desmarca la mena cuando termines para que se borre la macro.

**Autor**: Pirson · [GitHub](https://github.com/Pirson-s-Addons) · [CurseForge](https://www.curseforge.com/members/pirson/projects) · Licencia MIT
