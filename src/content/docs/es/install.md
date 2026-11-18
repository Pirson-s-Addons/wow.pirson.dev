---
title: Cómo instalar addons de WoW
description: "Instala cualquier addon de World of Warcraft en WoW Forever, MoP Classic, Classic o Retail, con la app de CurseForge o a mano, y soluciona los problemas más comunes."
sidebar:
  order: 1
---

Hay dos formas de instalar un addon: con la **app de CurseForge**, que además lo mantiene actualizado, o **a mano** desde el zip. Las dos sirven para todos los addons de esta web.

## Con la app de CurseForge (recomendado)

1. Instala la [app de CurseForge](https://www.curseforge.com/download/app) y elige **World of Warcraft**.
2. Arriba, elige tu versión del juego (por ejemplo **WoW Forever** o **MoP Classic**).
3. Busca el addon por su nombre y pulsa **Install**.
4. Abre el juego, o sal y vuelve a entrar si ya estaba abierto.

La app actualiza tus addons cada vez que sale una versión nueva.

## A mano

1. Descarga el zip desde la página del addon en CurseForge (pestaña **Files**) o desde su release de GitHub.
2. Descomprímelo: obtienes una carpeta con el nombre del addon.
3. Mueve esa carpeta a la carpeta `Interface/AddOns` de tu versión del juego:

| Versión del juego | Carpeta |
| --- | --- |
| WoW Forever | `World of Warcraft/_forever_/Interface/AddOns/` |
| MoP Classic | `World of Warcraft/_classic_/Interface/AddOns/` |
| Classic Era | `World of Warcraft/_classic_era_/Interface/AddOns/` |
| Retail | `World of Warcraft/_retail_/Interface/AddOns/` |

Si no existe la carpeta `Interface` o `AddOns`, créala.

4. Abre el juego, o sal y vuelve a entrar.

## El addon no aparece

- **Revisa la carpeta:** la carpeta del addon tiene que estar directamente dentro de `AddOns`, no dentro de otra carpeta con el mismo nombre (`AddOns/MiAddon/MiAddon/` no carga).
- **Actívalo:** en la pantalla de selección de personaje, pulsa **AddOns** abajo a la izquierda y márcalo.
- **"Desactualizado":** en esa misma pantalla, marca la casilla que permite cargar addons desactualizados (en inglés, **Load out of date AddOns**).
- **Versión del juego equivocada:** un addon solo carga en las versiones para las que está hecho. Cada página de addon de esta web las muestra bajo el título.
- **Después de actualizar:** sal y vuelve a entrar en vez de usar `/reload`, para que el juego lea los archivos nuevos.

¿Sigue sin funcionar? Deja un comentario en la página del addon en CurseForge con tu versión del juego, el idioma de tu cliente y el texto del error.
