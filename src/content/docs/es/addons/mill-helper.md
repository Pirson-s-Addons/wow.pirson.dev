---
title: "Mill Helper"
description: "Muele hierbas en un clic para Inscripción. Lista las hierbas de tus bolsas."
addon: mh
sidebar:
  order: 13
---

## Capturas

![Menú](/images/addons/mill-helper/mh-menu-png-849e23.webp)

## Qué hace

Mill Helper revisa tus bolsas en busca de hierbas que se puedan moler y las muestra en una pequeña ventana. Marca una hierba y aparecerá a su lado un botón de moler: cada clic lanza Moler sobre esa hierba, así que puedes acabar con un montón entero sin abrir el libro de hechizos ni escribir macros a mano.

## Funciones

- Lista todas las hierbas molibles de tus bolsas con su cantidad, agrupadas por expansión (de Classic a Mists of Pandaria).
- Una casilla por hierba: al marcarla se crea la macro `Mill_<NombreHierba>` y aparece un botón para moler con un clic; al desmarcarla se oculta el botón y se borra la macro.
- Las hierbas con menos de 5 unidades aparecen desactivadas, con un tooltip que explica el motivo.
- La lista se actualiza sola cuando cambian tus bolsas.
- Ventana movible y con scroll.
- Botón en el minimapa (LibDBIcon / LibDataBroker).
- Traducido a 20 idiomas.

## Uso

- **Clic izquierdo** en el botón del minimapa para abrir o cerrar la ventana.
- **Clic derecho** en el botón del minimapa para mostrar una breve ayuda en el chat.
- Marca una hierba y pulsa el botón de su lado una vez por cada molienda.

## Instalación

1. Descarga el zip desde la [última release](https://github.com/Pirson-s-Addons/MillHelper/releases/latest) o desde [CurseForge](https://www.curseforge.com/wow/addons/mill-helper).
2. Extrae la carpeta `MillHelper` en `World of Warcraft/_classic_/Interface/AddOns/` (Mists, Cataclysm y Wrath Classic usan todos `_classic_`).
3. Reinicia WoW y activa el addon.

## Notas

- Cada hierba marcada ocupa un hueco de tus macros generales. Deja uno libre y desmarca la hierba cuando termines para que se borre la macro.

**Autor**: Pirson · [GitHub](https://github.com/Pirson-s-Addons) · [CurseForge](https://www.curseforge.com/members/pirson/projects) · Licencia MIT
