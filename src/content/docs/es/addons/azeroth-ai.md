---
title: "Azeroth AI"
description: "Un chatbot dentro del juego para WoW Forever: pregunta sin salir del juego."
addon: ai
sidebar:
  order: 20
---

## Qué hace
Abre la ventana de chat con `/aai` y pregunta en español o en inglés. Azeroth AI te responde en el idioma en que le preguntas y usa los datos de tu personaje: nivel, facción, clase, zona y experiencia.

| Le preguntas | Te responde |
|---|---|
| ¿Dónde voy a levear? | Las mejores zonas para tu nivel y facción, y una mazmorra a tu nivel |
| ¿Qué mazmorra me toca? | Las mazmorras que encajan con tu nivel |
| ¿Dónde está BFD? | Sus niveles y su entrada, y te la marca en el mapa si dices "sí" |
| ¿Cuánto me falta para subir? | La experiencia que te falta y tu descanso |
| ¿Dónde está mi instructor? | El instructor de tu clase más cercano, con coordenadas y marcador (con Questie) |
| ¿Dónde está el maestro de vuelo / la posada / el banco / la casa de subastas? ¿Dónde reparo? | El más cercano, con coordenadas y marcador (con Questie) |
| ¿Cómo subo mi profesión? | Los rangos de profesión y hasta cuál te deja tu nivel |
| ¿Dónde entrego [misión]? ¿Quién la da? ¿Qué pide? | Mayús+clic en la misión de tu registro: quién la da, dónde se entrega y tu progreso |
| ¿Qué significa LFM? | El significado de la jerga del chat (necesita [WoW Translator](https://www.curseforge.com/wow/addons/wow-translator)) |

Funciona sin internet: todo lo que sabe va dentro del addon. Las preguntas que todavía no sabe responder se guardan solo en tu PC (`AzerothAIDB`) para que las próximas versiones las aprendan. La interfaz está traducida a 20 idiomas.

**También con mando (Xbox, PlayStation...)**: la cruceta pasa de un botón a otro, A pulsa, B cierra y una barra bajo la ventana dice qué hace cada botón. Junto a la ventana del chat, **preguntas rápidas** que se envían de un toque y un **teclado en pantalla** para escribir las tuyas.

## Capturas

![Dónde subir de nivel, marcado en tu mapa](/images/addons/azeroth-ai/azerotai-textarea2-png-258a71.webp)

![Tu instructor, estés donde estés](/images/addons/azeroth-ai/azerotai-textarea3-png-359cc5.webp)

![La rotación de tu especialización, paso a paso](/images/addons/azeroth-ai/azerotai-textarea4-png-83b577.webp)

![Su propia pestaña en el chat del juego](/images/addons/azeroth-ai/azerotai-textarea-png-bb7d8c.webp)

![Con mando: preguntas rápidas y teclado en pantalla](/images/addons/azeroth-ai/azerotai-mando-png-aea9b0.webp)

![Distancias, tono y cuándo habla](/images/addons/azeroth-ai/menu-ai-png-c8c71c.webp)

## Instalación
1. Extrae la carpeta `AzerothAI` en `World of Warcraft/_forever_/Interface/AddOns/`.
2. Reinicia WoW y activa el addon.

## Uso
- `/aai`: abre o cierra la ventana de chat (también desde el compartimento de addons, junto al minimapa).
- `/aai <pregunta>`: pregunta directamente.
- `/aai tab`: recupera la pestaña Azeroth AI del chat del juego (con Chattynator, explica cómo añadirla como pestaña especial).
- `/aai clear`: borra la conversación.
- `/aai fuentes`: lista los addons de los que lee datos.
- `/aai config`: abre el panel Acerca de.

## Cuantos más addons, más sabe
Azeroth AI lee datos de otros addons que tengas instalados, en tiempo de ejecución y sin copiar sus bases de datos. `/aai fuentes` te dice cuáles ha encontrado.

| Addon | Qué aprende Azeroth AI de él |
|---|---|
| Dungeon Quest Atlas | Misiones, jefes y botín de cada mazmorra, quién suelta un objeto, llaves de banda |
| [WoW Translator](https://www.curseforge.com/wow/addons/wow-translator) | El significado de miles de términos de jerga del chat |
| GatherRadar | Dónde hay hierbas, minerales y tesoros |
| Questie | Misiones cerca de ti e instructores, maestros de vuelo, posaderos, vendedores que reparan, banqueros y subastadores más cercanos |
| Polestar | El siguiente paso de tu guía y los niveles de las zonas de Forever |
| Deadly Boss Mods | Las habilidades con las que tener cuidado en cada jefe |

Siempre que te dice dónde está algo, te ofrece marcarlo en el mapa (**Sí / No**). Usa su propia flecha, el minimapa y un pin en el mapa del mundo, o la de TomTom si la tienes.

---

**Autor**: Pirson · [GitHub](https://github.com/Pirson-s-Addons) · [CurseForge](https://www.curseforge.com/members/pirson/projects) · Todos los derechos reservados
