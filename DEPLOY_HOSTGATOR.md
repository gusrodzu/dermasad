# Dermassad — despliegue con HostGator cPanel

## Repositorio
https://github.com/gusrodzu/dermasad

## Carpeta inicial de prueba
La configuración `.cpanel.yml` apunta a `$HOME/public_html/dermasad-preview/` para evitar sobrescribir el sitio principal. Verifica primero que esa carpeta no esté siendo utilizada. Si existe o ya aloja otro sitio, cambia la ruta antes del primer despliegue.

## Configurar cPanel
1. Abre `cPanel > Archivos > Git Version Control > Create`.
2. Activa `Clone a Repository` y usa `https://github.com/gusrodzu/dermasad.git`.
3. Como `Repository Path`, usa `repositories/dermasad`, **fuera de public_html**.
4. En `Manage > Pull or Deploy`, pulsa `Update from Remote` y, después, `Deploy HEAD Commit`.

## Llevarlo al dominio final
1. Confirma el directorio raíz del dominio en `cPanel > Domains`.
2. Haz respaldo del sitio publicado.
3. Cambia `DEPLOYPATH` en `.cpanel.yml` por la ruta exacta validada, haz commit y ejecuta nuevamente `Update from Remote` + `Deploy HEAD Commit`.
4. Verifica las dos sedes, persistencia del selector, botones WhatsApp, galerías y móviles.

**Importante:** GitHub no despliega automáticamente en cPanel con un simple push al remoto. El modo de actualización descrito requiere los dos botones manuales; la automatización completa se configura después por SSH y GitHub Actions.

Los archivos Sony RAW existentes en el repositorio quedan excluidos del despliegue, pero `.gitignore` no elimina los archivos RAW ya versionados. Se recomienda una limpieza posterior con copia en Drive y revisión antes de eliminarlos de Git.

Los precios, cédulas y agenda real requieren revisión antes del lanzamiento público.
