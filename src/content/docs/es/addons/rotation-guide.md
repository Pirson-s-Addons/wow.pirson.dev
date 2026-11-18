---
title: "Rotation Guide"
description: "La rotación de tu clase en WoW Forever, para las 27 especializaciones."
addon: rg
sidebar:
  order: 22
---

## Qué hace

Resalta en tu barra de acción el siguiente hechizo de tu rotación, para las 9 clases y las 27 ramas de talentos de **WoW Forever**.

## Funciones

- Hace brillar el hechizo en las barras de Blizzard (también la de posturas: auras de paladín, posturas de guerrero, formas de druida, sigilo) y lo muestra en un icono que puedes mover.
- Elige la rotación de la rama de talentos donde tienes más puntos.
- Solo propone hechizos que conoces, y siempre el rango más alto.
- Esquiva los datos de combate ocultos de Forever: lleva la cuenta de tus DoTs, buffs y tótems a partir de lo que lanzas.
- **Aviso de cura**: cuando tu vida baja de un umbral (40 % por defecto), tu cura o defensivo propio (Destello de luz, Evasión, Muro de escudo...) tapa el icono y brilla en rojo en tu barra. En Forever la vida está oculta para los addons, así que es el propio juego el que decide cuándo se ve: el addon nunca lee tu vida.
- **Se adapta a la situación**: buffs largos, encantamientos de arma y mascota antes de pelear; cooldowns grandes guardados para élites y jefes; las ramas de tanque usan la de daño cuando vas solo; tiene en cuenta área, melee/distancia, sigilo y formas.

## Comandos

| Comando | Qué hace |
|---|---|
| `/rg` | Activa / desactiva |
| `/rg single` | Fuerza un solo objetivo (ignora las reglas de área) |
| `/rg icon` · `/rg glow` | Muestra / oculta el icono o el brillo de la barra |
| `/rg lock` · `/rg reset` | Bloquea el icono (Mayús + arrastrar lo mueve) / lo devuelve a su sitio |
| `/rg heal 40` | Umbral del aviso de cura en % (`/rg heal 0` lo desactiva) |
| `/rg status` | Clase, rotación y enemigos contados |

## Instalación

1. Consíguelo en [CurseForge](https://www.curseforge.com/wow/addons/rotation-guide) o descarga el zip de la [última release](https://github.com/Pirson-s-Addons/RotationGuide/releases/latest).
2. Extrae la carpeta `RotationGuide` en la carpeta `Interface/AddOns/` de tu instalación de WoW Forever.
3. Reinicia el juego y activa el addon.

## Notas

Las ramas de curación (Sagrado, Disciplina, Restauración) usan una rotación de daño para subir de nivel: las curas dependen de la vida del grupo, que en combate está oculta.

## Para autores de addons

### API pública

De solo lectura, con versión y siempre devuelve copias. Añade `## OptionalDeps: RotationGuide` a tu TOC.

```lua
local api = RotationGuideAPI
if api and api.version == 1 then
    api.GetClasses()              -- { "DRUID", "HUNTER", ... }
    api.GetSpecs("PALADIN")       -- { { index = 1, name = "Holy" }, ... }
    api.GetRotation("PALADIN", 3) -- { { spellID, name, conditions = { missing = {...}, aoe = 2, ... } }, ... }
    api.GetHeals("PALADIN")       -- curas/defensivos que se usan cuando baja la vida
    api.GetPlayerSpec()           -- class, specIndex, specName
    api.GetNext()                 -- spellID resaltado ahora, spellID de la cura, umbral de cura en %
end
```

`conditions` usa los campos de regla documentados al principio de `Core/Engine.lua`.

### Tests

```bash
uv run --no-project --with lupa python -I Tests/run.py
```
