<<<<<<< HEAD
# Dermassad — GitHub a HostGator cPanel

## Estado actual
Este paquete proviene de `dermassad-consolidado-whatsapp-sedes.zip`. Conserva WhatsApp por sede, selector persistente, galerías diferenciadas y estilos.
Los originales ARW se excluyeron del paquete Git; permanecerán en Google Drive.

## Primera publicación segura (staging)
La ruta inicial en `.cpanel.yml` es `$HOME/public_html/dermasad-preview/`.
Se eligió de forma deliberada para **no sobrescribir un sitio existente**.
**Antes de publicar:** comprueba que ese directorio no esté siendo utilizado por otro sitio.
Si ya existe, modifica la ruta y revisa los comandos.

## Subir código inicial
Repositorio remoto: https://github.com/gusrodzu/dermasad

Si el repositorio tiene un commit de preparación, clónalo desde Windows:
```
git clone https://github.com/gusrodzu/dermasad.git
cd dermasad
```
Copia los archivos de este ZIP (index.html, script.js, styles.css, assets, .cpanel.yml...) al repositorio clonado, sin copiar la carpeta que los contiene.
```
git add .
git commit -m "feat: importar sitio Dermassad consolidado"
git push origin main
```
Si GitHub sigue vacío, puedes inicializar desde los archivos del paquete:
```
git init -b main
git remote add origin https://github.com/gusrodzu/dermasad.git
git add .
git commit -m "feat: sitio Dermassad + despliegue staging cPanel"
git push -u origin main
```

## cPanel (HostGator)
1. Abre cPanel > Files / Archivos > Git Version Control.
2. Create > Clone a Repository.
3. Clone URL: `https://github.com/gusrodzu/dermasad.git`
4. Repository Path: `repositories/dermasad` (fuera de `public_html`).
5. Manage > Pull or Deploy > Update from Remote.
6. Manage > Pull or Deploy > Deploy HEAD Commit.

Las actualizaciones posteriores de GitHub requieren **Update from Remote** y **Deploy HEAD Commit**. No es un auto-despliegue con solo `git push` a GitHub.
La carpeta de previsualización no se protege automáticamente; antes de exponerla al público usa contraseña o un subdominio de staging privado.

## Paso a producción
Confirma primero el **document root** exacto del dominio en cPanel > Domains.
Cambia DEPLOYPATH en `.cpanel.yml` al document root aprobado, haz un commit y vuelve a ejecutar Update from Remote + Deploy HEAD Commit.
Haz copia de seguridad del sitio en producción antes del primer despliegue.
La configuración **no borra archivos viejos** en el hosting; revisa recursos obsoletos.

## Verificaciones
- URLs `#/monterrey` y `#/playa-del-carmen`.
- Selector de sede y persistencia al recargar.
- WhatsApp de ambas sedes.
- Fotos y galerías correctas.
- Layout móvil y pie de página.
- Cédulas, tarifas y disponibilidad de agenda todavía requieren validación antes de anunciar la publicación oficial.
=======
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
>>>>>>> ff04c0156f35a6258be69d35233854e7bc3a0059
