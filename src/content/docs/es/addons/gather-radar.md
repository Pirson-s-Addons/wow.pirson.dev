---
title: "Gather Radar"
description: "Hierbas, minerales, tesoros y bancos de peces en el minimapa y el mapa del mundo."
addon: gr
sidebar:
  order: 7
---

## Capturas

![Nodos en el minimapa](/images/addons/gather-radar/minimap-show-png-6dcff5.webp)

![Elige qué mostrar](/images/addons/gather-radar/map-options-png-41928b.webp)

![Vetas de mineral](/images/addons/gather-radar/ore-png-801703.webp)

![Hierbas y la habilidad que piden](/images/addons/gather-radar/herb-png-417108.webp)

![Cofres de tesoro](/images/addons/gather-radar/chest-png-1f133d.webp)

![Bancos de peces](/images/addons/gather-radar/fish-png-91af6b.webp)

## Qué hace

**GatherRadar** convierte Buscar hierbas, Buscar minerales, Buscar tesoros y Buscar peces en un radar de recolección de verdad. Cada nodo guardado cerca de ti sale en el minimapa como un **aro hueco** del color de tu probabilidad de subir habilidad, de las profesiones que tienes: si el nodo está, el punto del rastreo se ve dentro del aro. Lo que encuentra tu grupo sale con el **icono de lo que da** (Flor de paz, Mineral de cobre, un cofre...), más grande y con brillo. Cada nodo que recoges se **recuerda** en el **mapa del mundo**, para que planees tu ruta de un vistazo.

## Funciones

- **Aros en el minimapa**: cada hierba, filón, cofre y banco de peces guardado a tu alrededor, del color de la ventana de profesión (naranja, amarillo, verde, gris; rojo si aún no tienes habilidad). Lo que encuentra tu grupo sale con el icono real del objeto.
- **Recuerda cada nodo**: los que recoges (posición exacta) y los que encuentra tu grupo, para encontrarlos luego en el mapa del mundo.
- **Pines en el mapa del mundo** con todos los nodos guardados de la zona. Mayús + clic derecho en un pin lo borra.
- **Sin duplicados**: dos nodos del mismo tipo a menos de 15 yardas (tú eliges) son el mismo sitio y se queda solo uno.
- **Nodos conocidos incluidos**: con un clic importas las hierbas, menas y tesoros de WoW Forever (datos de Wowhead de GatherMate2_Data) y los bancos de peces que te faltan, de los tipos que elijas, sin necesitar otro addon. Los tuyos nunca se sustituyen.
- **Filtro de mapas**: un botón redondo en el mapa del mundo elige qué tipos (hierbas, menas, tesoros, bancos de peces) salen en el minimapa y en el mapa del mundo. La flecha también lo sigue.
- **Flecha 3D al nodo más cercano** con su nombre y distancia, dando prioridad a lo que está ahora. Se salta 5 minutos el nodo por el que acabas de pasar. Actívala o desactívala desde el botón del mapa del mundo.
- **Compartir con el grupo**: tus compañeros con GatherRadar ven los nodos que encuentras, y tú los suyos, en vivo.
- **Panel de sesión**: nodos recogidos y materiales conseguidos, con iconos, total y por hora.
- **Funciona en tu idioma**: hierbas, menas, tesoros y bancos de peces se reconocen por su nombre del juego en todos los idiomas oficiales; los nodos nuevos de Forever se aprenden al recoger.
- Opciones en el propio panel del juego **Opciones → AddOns**, 20 idiomas, sin librerías.

## Uso

- Activa **Buscar hierbas**, **Buscar minerales**, **Buscar tesoros** o **Buscar peces** en el menú de rastreo del minimapa. GatherRadar hace el resto.
- `/gr` abre las opciones. `/gr session` muestra el panel de sesión, `/gr arrow` la flecha, `/gr import` importa los nodos de Wowhead.
- **Opciones → AddOns → GatherRadar → General**: qué se ve y dónde, el radar y el tamaño de los iconos.
- **Opciones → AddOns → GatherRadar → Datos**: nodos guardados, duplicados, importar (eligiendo los tipos), borrar y olvidar todo.

## Instalación

1. Descarga el zip de [CurseForge](https://www.curseforge.com/wow/addons/gather-radar) o de la [última versión](https://github.com/Pirson-s-Addons/GatherRadar/releases/latest).
2. Extrae la carpeta `GatherRadar` en `World of Warcraft/_forever_/Interface/AddOns/`.
3. Reinicia WoW y activa el addon.

## Notas

- Un addon no puede preguntar al juego dónde están los nodos y, desde los cambios de Blizzard en la API, tampoco puede leer el minimapa (el nombre del punto del rastreo es secreto, incluso bajo tu propio ratón). Un nodo recordado es solo un aro: si está vacío, puede que ya lo haya recogido alguien.
- Los bancos de peces llegan solo de la importación y de tu grupo (el botín de pesca sale del corcho, no del banco, y el minimapa no se puede leer).
- Los nodos nuevos de WoW Forever (Cold Iron Deposit, Dreamroot...) se reconocen en inglés; en otros idiomas su nombre se aprende la primera vez que los recoges. Las hierbas con una palabra de más (Flor de paz marchita) cuentan como la hierba.

**Autor**: Pirson · [GitHub](https://github.com/Pirson-s-Addons) · [CurseForge](https://www.curseforge.com/members/pirson/projects) · Licencia MIT

## Para autores de addons

### API pública

De solo lectura, con versión y siempre devuelve copias. Añade `## OptionalDeps: GatherRadar` a tu TOC y llámala después de `PLAYER_LOGIN`. Las coordenadas van de 0 a 100 (como TomTom) y los IDs de nodo son los de GatherMate2.

```lua
local api = GatherRadarAPI
if api and api.version == 1 then
    api.KINDS                        -- { "herb", "ore", "treasure", "fish" }
    api.FindNode("Copper Vein")      -- nodeID, kind (en inglés o en el idioma del cliente)
    api.GetNodeInfo(201)             -- { nodeID, kind, name, englishName, item, skill }
    api.GetNodes(1426, "ore")        -- { { x, y, nodeID }, ... } conocidos en ese mapa
    api.GetMapsForNode(201)          -- { { mapID, count }, ... } primero el que más tiene
    api.GetNearest("herb")           -- { mapID, x, y, nodeID, yards } o nil
    api.HasProfession("ore")         -- true si el jugador puede recogerlo
end
```
