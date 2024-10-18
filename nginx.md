# Producción Frontend
1. Recargar la configuración de NGINX:

Si realizas cambios en la configuración de NGINX y deseas aplicarlos sin detener el servidor, ejecuta:


nginx -s reload


2. Reabrir los archivos de log de NGINX:

Si los archivos de log han sido rotados (renombrados o movidos), puedes forzar que NGINX vuelva a abrirlos con:


nginx -s reopen

3. Detener NGINX de manera segura:

Este comando detiene NGINX esperando que las conexiones actuales finalicen de manera ordenada:


nginx -s quit

4. Apagar NGINX inmediatamente:

Si necesitas detener NGINX de inmediato, sin esperar a que las conexiones finalicen:


nginx -s stop

5. Verificar la configuración antes de recargar:

Para asegurarte de que la configuración de NGINX es válida antes de recargarla, utiliza:


nginx -t
