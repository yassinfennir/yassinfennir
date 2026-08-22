# Fix de atajos de teclado (Super+K, Alt+F4)

Un solo comando, pegado en la terminal de tu PC (no en Claude Code remoto):

```bash
git clone -b claude/keyboard-shortcuts-issue-82k2m5 https://github.com/yassinfennir/yassinfennir.git ~/atajos-fix
bash ~/atajos-fix/tools/atajos/fix-atajos.sh
```

El script detecta solo dónde está y hace lo que toca:

| Tu caso | Qué hace |
|---|---|
| **Omarchy / Hyprland** | **Alt+F4** cierra ventana y **Alt+Tab** enseña/rota las ventanas abiertas (backup de `bindings.conf` antes de tocar nada). Ojo: **Super+K ya lo usa Omarchy** para mostrar todos sus atajos. |
| **Ubuntu/GNOME nativo** | Restaura **Alt+F4** para cerrar ventanas y crea **Super+K** (abre terminal). Backup automático antes de tocar nada. |
| **WSL2 bajo Windows** | Copia `atajos.ahk` al arranque de Windows para que **Win+K** funcione (Windows captura la tecla Win; no se puede arreglar desde Linux). Necesita [AutoHotkey v2](https://www.autohotkey.com), gratis. |
| **KDE/XFCE/otro** | No toca nada; te dice el menú exacto donde configurarlo. |

## Opciones

```bash
./fix-atajos.sh --superk "firefox"   # Super+K ejecuta lo que quieras
./fix-atajos.sh --restaurar          # deshace todo con el backup
./fix-atajos.sh --help
```

## Lo que ningún script puede arreglar

Dentro de una terminal (bash, Claude Code) la tecla **Super/Win no existe**: los
emuladores de terminal solo transmiten Ctrl y Alt. No es un fallo tuyo ni del
script — usa Ctrl o Alt para atajos dentro de la terminal.
