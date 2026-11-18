---
title: "Azeroth Tic-Tac-Toe"
description: "Juega al tres en raya contra otro jugador apostando oro, con ranking e historial."
addon: tt
sidebar:
  order: 19
---

## Capturas

![Tablero](/images/addons/azeroth-tic-tac-toe/tablero-png-e82e56.webp)

![Una victoria](/images/addons/azeroth-tic-tac-toe/tablero-1-png-67fffb.webp)

![Reta a alguien apostando oro](/images/addons/azeroth-tic-tac-toe/screenshot_1-png-430b0a.webp)

![Tu historial contra cada jugador](/images/addons/azeroth-tic-tac-toe/screenshot_2-png-96a552.webp)

![Quién debe a quién](/images/addons/azeroth-tic-tac-toe/screenshot_3-png-5587db.webp)

![Tus últimas 50 partidas](/images/addons/azeroth-tic-tac-toe/screenshot_4-png-a4863d.webp)

![Opciones](/images/addons/azeroth-tic-tac-toe/options-menu-png-9595f3.webp)

![Ajustes](/images/addons/azeroth-tic-tac-toe/options-menu-config-png-1fde59.webp)

## Qué hace

**Azeroth TicTacToe** te deja retar a otro jugador que también tenga el addon al 3 en raya clásico, con fichas que se mueven y apuesta en oro, plata o cobre si quieres. Victorias, derrotas, deudas y el historial de partidas se guardan entre sesiones.

## Reglas

- Cada jugador tiene **3 fichas**. Primero se colocan por turnos.
- Cuando los dos tienen sus 3 fichas en el tablero, en cada turno **mueves una de tus fichas** a una casilla libre de al lado, siguiendo una línea (fila, columna o diagonal).
- Gana el primero que hace **3 en raya**. No hay empate por sí solo: la partida sigue hasta que alguien gana.
- Quién empieza se decide **a cara o cruz**.
- Si un jugador no mueve en **5 minutos** (desconectado o ausente), la partida caduca: nadie gana ni pierde. El tablero muestra la cuenta atrás del turno del rival.

## Funciones

- Reta a cualquiera que tenga el addon, con o sin apuesta en **oro, plata y cobre**.
- ¿Nadie con quien jugar? **vs Azeroth AI** (en el tablero y en el Libro) empieza una partida contra el ordenador. Sin apuesta: cuenta en el Historial y en Rivales, no en el Ranking.
- Tablero 3x3 en su propia ventana; las jugadas viajan como mensajes de addon y cada jugada que llega se comprueba con las reglas (rival correcto, su turno, jugada válida).
- Botón **Rendirse**: termina la partida como derrota (pide confirmación). Cerrar el tablero solo lo oculta.
- Botón **Tablas**: muestra "Tablas", "Tablas 1/2" y "Tablas 2/2". Solo cuando lo pulsan los dos jugadores la partida acaba sin que nadie gane ni pierda.
- Solo los dos jugadores de la partida pueden mover, rendirse o pedir tablas.
- Botón **Revancha** al acabar la partida: reta otra vez al mismo jugador por la misma apuesta. El otro ve "Aceptar revancha" en su propio tablero y acepta con un clic.
- **Libro de Cuentas Goblin** con cuatro pestañas: **Ranking** (victorias y derrotas de cada uno de tus personajes), **Rivales** (tus victorias, derrotas, tablas y dinero ganado o perdido contra cada jugador), **Deudas** e **Historial** (tus últimas 50 partidas). Si lo abres con un jugador seleccionado, su nombre ya viene puesto para retarle.
- Botón **Cobrar** en cada deuda a tu favor: selecciona al jugador y púlsalo para abrir el comercio (WoW solo deja a un addon abrir un comercio desde un clic).
- Botón **Pagado** en cada deuda: no borra nada, pide al otro jugador que lo confirme. La deuda sale de los dos libros solo cuando el otro escribe `/ttt aceptar pagado`; con `/ttt cancelar pagado` se queda en los dos.
- Icono de minimapa: clic izquierdo abre el Libro de cuentas, clic derecho muestra u oculta el tablero.
- **Opciones → AddOns → Azeroth TicTacToe**: página Acerca de con las reglas, enlaces y comandos, y página **General** con botón del minimapa, sonidos, aceptar retos y tamaño del tablero.
- Traducido a 20 idiomas.

## Uso

Los comandos van en el idioma de tu cliente; los de inglés (`accept`, `cancel`, `paid`) valen siempre.

- `/ttt` abre las opciones y muestra los comandos en el chat.
- `/ttt <jugador> [oro] [plata] [cobre]` reta a un jugador, con apuesta opcional: `/ttt Caudillo Jr 0 0 10` apuesta 10 de cobre.
- `/ttt ia` empieza una partida contra Azeroth AI, el ordenador.
- `/ttt aceptar` / `/ttt cancelar` acepta o rechaza el reto pendiente.
- `/ttt aceptar pagado` / `/ttt cancelar pagado` confirma o niega que una deuda se ha pagado.

## Instalación

Instálalo desde [CurseForge](https://www.curseforge.com/wow/addons/azeroth-tic-tac-toe), o a mano:

1. Descarga el zip de la [última release](https://github.com/Pirson-s-Addons/AzerothTicTacToe/releases/latest).
2. Extrae la carpeta `AzerothTicTacToe` en `World of Warcraft/_forever_/Interface/AddOns/`.
3. Reinicia el juego y activa el addon.

Solo se carga en WoW Forever: su único `.toc` es `AzerothTicTacToe_Camelot.toc` (`Camelot` es el game type de Forever), así que ningún otro cliente lo muestra. Los dos jugadores necesitan el addon.

## Para autores de addons

### API pública

Global `AzerothTicTacToeAPI` (`version = 1`):

- `AzerothTicTacToeAPI.PlayVsAI()` abre el tablero contra Azeroth AI. Devuelve `false` si ya hay una partida en curso.
- `AzerothTicTacToeAPI.IsPlaying()` devuelve `true` durante una partida.

Comprueba `AzerothTicTacToeAPI.version == 1` antes de usarla.

**Autor**: Pirson · [GitHub](https://github.com/Pirson-s-Addons) · [CurseForge](https://www.curseforge.com/members/pirson/projects) · Licencia MIT
