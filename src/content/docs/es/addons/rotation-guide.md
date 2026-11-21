---
title: "Rotation Guide"
description: "La rotación de tu clase en WoW Forever, para las 27 especializaciones."
addon: rg
sidebar:
  order: 22
---

## Qué hace

Resalta en tu barra de acción el siguiente hechizo de tu rotación, para las 9 clases y las 27 ramas de talentos de **WoW Forever**.

## Capturas

![Tu siguiente hechizo brilla en la barra y en su icono](/images/addons/rotation-guide/recomendacion3-png-971265.webp)

![Listo antes del combate: tu aura](/images/addons/rotation-guide/recomendacion1-png-81a5cf.webp)

![Bufos y bendiciones antes de pelear](/images/addons/rotation-guide/recomendacion2-png-e46aaa.webp)

![Crea tu propia rotación y compártela](/images/addons/rotation-guide/menu-rotation2-png-69b2e7.webp)

![Opciones y aviso de curación](/images/addons/rotation-guide/menu-rotation1-png-5c51fa.webp)

## Funciones

- Hace brillar el hechizo en las barras de Blizzard (también la de posturas: auras de paladín, posturas de guerrero, formas de druida, sigilo) y lo muestra en un icono que puedes mover.
- Elige la rotación de la rama de talentos donde tienes más puntos.
- **Tu propia rotación**: en *Opciones > AddOns > Rotation Guide > Mi rotación* (o `/rg editor`) creas perfiles por rama con los hechizos de tu libro, los ordenas y eliges cuándo se usa cada uno. **Exportar** te da un código para compartirlo; **Importar** guarda el de un amigo como un perfil nuevo sin tocar el tuyo, y cambias de perfil cuando quieras.
- Solo propone hechizos que conoces, y siempre el rango más alto.
- Esquiva los datos de combate ocultos de Forever: lleva la cuenta de tus DoTs, buffs y tótems a partir de lo que lanzas.
- **Aviso de cura**: cuando tu vida baja de un umbral (40 % por defecto), tu cura o defensivo propio (Destello de luz, Evasión, Muro de escudo...) tapa el icono y brilla en rojo en tu barra. En Forever la vida está oculta para los addons, así que es el propio juego el que decide cuándo se ve: el addon nunca lee tu vida.
- **Se adapta a la situación**: buffs largos, encantamientos de arma y mascota antes de pelear; cooldowns grandes guardados para élites y jefes; las ramas de tanque usan la de daño cuando vas solo; tiene en cuenta área, melee/distancia, sigilo y formas.

## Comandos

| Comando | Qué hace |
|---|---|
| `/rg` | Abre las opciones |
| `/rg toggle` | Activa / desactiva |
| `/rg single` | Fuerza un solo objetivo (ignora las reglas de área) |
| `/rg icon` · `/rg glow` | Muestra / oculta el icono o el brillo de la barra |
| `/rg lock` · `/rg reset` | Bloquea el icono (Mayús + arrastrar lo mueve) / lo devuelve a su sitio |
| `/rg heal 40` | Umbral del aviso de cura en % (`/rg heal 0` lo desactiva) |
| `/rg status` | Clase, rotación, puntos por rama y enemigos contados |
| `/rg editor` | Abre el editor de rotaciones y perfiles |

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
