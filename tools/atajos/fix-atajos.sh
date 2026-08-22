#!/usr/bin/env bash
# fix-atajos.sh — arregla los atajos de teclado del PC de Yassin.
#
# Detecta solo dónde está corriendo y aplica el fix que toca:
#   - Omarchy / Hyprland: Alt+F4 cierra ventana y Alt+Tab lista todas las ventanas
#     abiertas (con backup del bindings.conf). Super+K ya lo usa Omarchy para
#     mostrar todos los atajos — no se toca.
#   - GNOME nativo (Ubuntu, Fedora...): configura Super+K y restaura Alt+F4 vía gsettings.
#   - WSL2 bajo Windows: instala el script de AutoHotkey en el arranque de Windows
#     para que Win+K abra la terminal (Windows captura la tecla Win antes que Linux;
#     no hay forma de arreglarlo desde dentro de WSL, hay que hacerlo del lado Windows).
#   - Otros escritorios (KDE, XFCE...): dice exactamente dónde tocar, sin romper nada.
#
# Uso:
#   ./fix-atajos.sh                        # Super+K abre una terminal
#   ./fix-atajos.sh --superk "firefox"     # Super+K ejecuta lo que tú quieras
#   ./fix-atajos.sh --restaurar            # deshace los cambios usando el último backup
#
# Antes de tocar nada guarda un backup en ~/.atajos-backup-<fecha>.txt

set -euo pipefail

SUPERK_CMD=""
RESTAURAR=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --superk) SUPERK_CMD="${2:?falta el comando tras --superk}"; shift 2 ;;
    --restaurar) RESTAURAR=1; shift ;;
    -h|--help) grep '^#' "$0" | grep -v '^#!' | sed 's/^# \{0,1\}//'; exit 0 ;;
    *) echo "Opción desconocida: $1 (usa --help)"; exit 1 ;;
  esac
done

azul()  { printf '\033[1;34m%s\033[0m\n' "$*"; }
verde() { printf '\033[1;32m%s\033[0m\n' "$*"; }
rojo()  { printf '\033[1;31m%s\033[0m\n' "$*"; }

es_wsl() {
  [[ -n "${WSL_DISTRO_NAME:-}" ]] || grep -qi microsoft /proc/version 2>/dev/null
}

# ---------------------------------------------------------------- GNOME nativo
fix_gnome() {
  local backup="$HOME/.atajos-backup-$(date +%Y%m%d-%H%M%S).txt"

  if [[ $RESTAURAR -eq 1 ]]; then
    local ultimo
    ultimo=$(ls -t "$HOME"/.atajos-backup-*.txt 2>/dev/null | head -1 || true)
    if [[ -z "$ultimo" ]]; then rojo "No hay ningún backup que restaurar."; exit 1; fi
    azul "Restaurando desde $ultimo ..."
    # El backup guarda líneas "schema|clave|valor"
    while IFS='|' read -r schema clave valor; do
      gsettings set "$schema" "$clave" "$valor"
    done < "$ultimo"
    verde "Restaurado. Los atajos han vuelto a como estaban."
    exit 0
  fi

  azul "GNOME detectado. Guardando backup en $backup ..."
  {
    printf 'org.gnome.desktop.wm.keybindings|close|%s\n' \
      "$(gsettings get org.gnome.desktop.wm.keybindings close)"
    printf 'org.gnome.settings-daemon.plugins.media-keys|custom-keybindings|%s\n' \
      "$(gsettings get org.gnome.settings-daemon.plugins.media-keys custom-keybindings)"
  } > "$backup"

  # 1) Alt+F4 para cerrar ventana (GNOME reciente solo trae Super+Q)
  azul "Restaurando Alt+F4 para cerrar ventanas..."
  gsettings set org.gnome.desktop.wm.keybindings close "['<Alt>F4', '<Super>q']"

  # 2) Avisar si Super+K ya está ocupado por otro atajo del sistema
  local conflicto
  conflicto=$( { gsettings list-recursively org.gnome.desktop.wm.keybindings 2>/dev/null;
                 gsettings list-recursively org.gnome.shell.keybindings 2>/dev/null; } \
    | grep -i "<Super>k'" || true)
  if [[ -n "$conflicto" ]]; then
    rojo "Ojo: Super+K ya estaba asignado aquí y va a dejar de hacer eso:"
    echo "$conflicto"
  fi

  # 3) Super+K como atajo personalizado
  if [[ -z "$SUPERK_CMD" ]]; then
    for t in gnome-terminal kgx tilix x-terminal-emulator xterm; do
      if command -v "$t" >/dev/null 2>&1; then SUPERK_CMD="$t"; break; fi
    done
    : "${SUPERK_CMD:=gnome-terminal}"
  fi

  local base="org.gnome.settings-daemon.plugins.media-keys"
  local ruta="/org/gnome/settings-daemon/plugins/media-keys/custom-keybindings/atajos-superk/"
  local lista
  lista=$(gsettings get "$base" custom-keybindings)
  if [[ "$lista" != *"$ruta"* ]]; then
    if [[ "$lista" == "@as []" || "$lista" == "[]" ]]; then
      lista="['$ruta']"
    else
      lista="${lista%]}, '$ruta']"
    fi
    gsettings set "$base" custom-keybindings "$lista"
  fi
  gsettings set "$base.custom-keybinding:$ruta" name "Super+K (fix-atajos)"
  gsettings set "$base.custom-keybinding:$ruta" command "$SUPERK_CMD"
  gsettings set "$base.custom-keybinding:$ruta" binding "<Super>k"

  verde "Listo. Super+K ejecuta: $SUPERK_CMD  |  Alt+F4 cierra ventanas."
  verde "Efecto inmediato, sin reiniciar. Para deshacer: ./fix-atajos.sh --restaurar"
}

# ----------------------------------------------------------------------- WSL2
fix_wsl() {
  azul "WSL2 detectado. La tecla Win la captura Windows antes de llegar a Linux,"
  azul "así que el fix se instala del lado Windows con AutoHotkey."

  local winuser inicio ahk_destino
  winuser=$(cmd.exe /c "echo %USERNAME%" 2>/dev/null | tr -d '\r' || true)
  if [[ -z "$winuser" ]]; then
    rojo "No pude hablar con Windows desde WSL. Haz esto a mano:"
    echo "  1. Instala AutoHotkey v2: https://www.autohotkey.com"
    echo "  2. Copia tools/atajos/atajos.ahk a la carpeta que abre Win+R -> shell:startup"
    echo "  3. Doble clic en el archivo para activarlo ya."
    exit 1
  fi

  inicio="/mnt/c/Users/$winuser/AppData/Roaming/Microsoft/Windows/Start Menu/Programs/Startup"
  ahk_destino="$inicio/atajos.ahk"
  local origen
  origen="$(cd "$(dirname "$0")" && pwd)/atajos.ahk"

  if [[ ! -d "$inicio" ]]; then
    rojo "No encuentro la carpeta de inicio de Windows en: $inicio"
    echo "Copia $origen a la carpeta que abre Win+R -> shell:startup"
    exit 1
  fi

  cp "$origen" "$ahk_destino"
  verde "Copiado atajos.ahk al arranque de Windows ($winuser)."

  if [[ -x "/mnt/c/Program Files/AutoHotkey/v2/AutoHotkey64.exe" ]]; then
    "/mnt/c/Program Files/AutoHotkey/v2/AutoHotkey64.exe" "$(wslpath -w "$ahk_destino")" &
    verde "AutoHotkey lanzado: Win+K ya funciona. Y arrancará solo con Windows."
  else
    rojo "Falta AutoHotkey v2. Instálalo (2 min): https://www.autohotkey.com"
    echo "Después haz doble clic en: $(wslpath -w "$ahk_destino" 2>/dev/null || echo "$ahk_destino")"
    echo "Desde el próximo arranque de Windows se activa solo."
  fi

  echo
  azul "Nota: dentro de la terminal (bash, Claude Code) la tecla Win no existe."
  azul "Ahí usa Ctrl o Alt; eso no es un fallo, es cómo funcionan las terminales."
}

# ------------------------------------------------------- Omarchy / Hyprland
fix_hyprland() {
  local conf="$HOME/.config/hypr/bindings.conf"
  local marca="# --- fix-atajos ---"

  if [[ $RESTAURAR -eq 1 ]]; then
    local ultimo
    ultimo=$(ls -t "$HOME"/.atajos-backup-*-bindings.conf 2>/dev/null | head -1 || true)
    if [[ -z "$ultimo" ]]; then rojo "No hay ningún backup que restaurar."; exit 1; fi
    cp "$ultimo" "$conf"
    hyprctl reload >/dev/null 2>&1 || true
    verde "Restaurado $conf desde $ultimo."
    exit 0
  fi

  azul "Hyprland/Omarchy detectado."
  if [[ ! -f "$conf" ]]; then
    rojo "No encuentro $conf — ¿Omarchy muy nuevo (bindings.lua)? No toco nada."
    echo "Añade tus atajos donde diga el visor de Super+K y cuéntamelo para adaptar el script."
    exit 1
  fi
  if grep -qF "$marca" "$conf"; then
    verde "El fix ya estaba aplicado en $conf. Nada que hacer."
  else
    local backup="$HOME/.atajos-backup-$(date +%Y%m%d-%H%M%S)-bindings.conf"
    cp "$conf" "$backup"
    azul "Backup guardado en $backup"
    {
      echo ""
      echo "$marca"
      echo "# Alt+F4 cierra la ventana actual (ademas del Super+W de Omarchy)"
      echo "bind = ALT, F4, killactive"
      if command -v walker >/dev/null 2>&1 && command -v elephant-windows >/dev/null 2>&1; then
        echo "# Alt+Tab: lista de TODAS las ventanas abiertas; escribe para filtrar, Enter salta"
        echo "bind = ALT, Tab, exec, walker -m windows"
      else
        echo "# Alt+Tab: rota entre las ventanas del workspace actual"
        echo "bind = ALT, Tab, cyclenext"
        echo "bind = ALT, Tab, bringactivetotop"
      fi
      echo "$marca fin"
    } >> "$conf"
    hyprctl reload >/dev/null 2>&1 || true
    verde "Listo. Alt+F4 cierra ventana y Alt+Tab te enseña/rota lo abierto. Sin reiniciar."
  fi
  echo
  azul "Chuleta Omarchy: Super+K = TODOS los atajos | Super+W = cerrar | Super+Space = lanzar apps"
  azul "Super+Tab / Super+Shift+Tab = siguiente/anterior workspace | Super+flechas = mover el foco"
  azul "Para deshacer este fix: ./fix-atajos.sh --restaurar"
}

# ---------------------------------------------------------------------- Otros
fix_otro() {
  rojo "No he detectado ni GNOME ni WSL2 (escritorio: ${XDG_CURRENT_DESKTOP:-desconocido})."
  echo "Dónde configurar Super+K según tu escritorio:"
  echo "  KDE Plasma : Preferencias -> Atajos -> Atajos personalizados"
  echo "  XFCE       : Configuración -> Teclado -> Atajos de aplicaciones"
  echo "  Cinnamon   : Configuración -> Teclado -> Atajos -> Personalizado"
  echo "No he tocado nada."
  exit 1
}

es_gnome() {
  [[ "${XDG_CURRENT_DESKTOP:-}" == *GNOME* ]] && return 0
  command -v gsettings >/dev/null 2>&1 \
    && gsettings list-schemas 2>/dev/null | grep -q '^org.gnome.desktop.wm.keybindings$'
}

es_hyprland() {
  [[ -n "${HYPRLAND_INSTANCE_SIGNATURE:-}" ]] || command -v hyprctl >/dev/null 2>&1
}

if es_wsl; then
  fix_wsl
elif es_hyprland; then
  fix_hyprland
elif es_gnome; then
  fix_gnome
else
  fix_otro
fi
