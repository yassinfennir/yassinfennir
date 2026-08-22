; atajos.ahk — atajos de Yassin del lado Windows (AutoHotkey v2)
; Windows captura la tecla Win antes de que llegue a WSL/terminal,
; asi que Win+K se define aqui, no dentro de Linux.
;
; Instalacion: fix-atajos.sh lo copia solo a shell:startup.
; A mano: doble clic para activarlo ya; copialo a Win+R -> shell:startup
; para que arranque siempre con Windows.
;
; Leyenda de teclas: # = Win, ! = Alt, ^ = Ctrl, + = Shift

#Requires AutoHotkey v2.0
#SingleInstance Force

; Win+K -> abre la terminal por defecto (Windows Terminal con tu perfil habitual)
#k:: Run "wt.exe"

; Win+Shift+K -> abre Ubuntu (WSL) directamente
#+k:: Run 'wt.exe wsl.exe'

; Anade aqui los tuyos, una linea por atajo. Ejemplos:
; #b:: Run "https://claude.ai"          ; Win+B -> abre Claude en el navegador
; #n:: Run "notepad.exe"                ; Win+N -> bloc de notas
