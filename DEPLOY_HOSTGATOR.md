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
