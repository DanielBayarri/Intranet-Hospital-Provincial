
# Servidor de Producción PM2

## 1. Iniciar la aplicación con PM2

Inicia tu aplicación con el siguiente comando:

```bash
pm2 start dist/main.js
```

## 2. Ver el estado de las aplicaciones con PM2

Para ver todas las aplicaciones gestionadas por PM2:

```bash
pm2 list
```

Este comando mostrará una lista con todas las aplicaciones, su estado actual (online, stopped, etc.), su ID y otros detalles.

## 3. Ver los logs en tiempo real

Para ver los logs en tiempo real de todas las aplicaciones:

```bash
pm2 logs
```

Para ver los logs de una aplicación específica usando su ID (por ejemplo, ID 0):

```bash
pm2 logs 0
```

También puedes usar el nombre de la aplicación:

```bash
pm2 logs <nombre-aplicacion>
```

## 4. Detener una aplicación

Para detener una aplicación específica por ID:

```bash
pm2 stop 0
```

O detenerla por nombre:

```bash
pm2 stop <nombre-aplicacion>
```

## 5. Reiniciar una aplicación

Para reiniciar una aplicación por ID:

```bash
pm2 restart 0
```

O reiniciarla por nombre:

```bash
pm2 restart <nombre-aplicacion>
```

## 6. Ver logs anteriores (históricos)

Para ver las últimas 100 líneas de logs históricos:

```bash
pm2 logs --lines 100
```

## 7. Monitorear aplicaciones en tiempo real

Para monitorear el rendimiento en tiempo real de tus aplicaciones:

```bash
pm2 monit
```

Este comando abrirá una interfaz que muestra el uso de CPU, memoria, y el estado de las aplicaciones gestionadas por PM2.

## 8. Eliminar una aplicación de PM2

Para eliminar una aplicación por ID:

```bash
pm2 delete 0
```

O eliminarla por nombre:

```bash
pm2 delete <nombre-aplicacion>
```

## 9. Persistencia de PM2 (Mantenerlo corriendo tras reinicios)

Para asegurarte de que PM2 restaure tus aplicaciones automáticamente después de un reinicio del servidor:

```bash
pm2 startup
```

Luego, sigue las instrucciones que te aparecerán en pantalla para habilitar la persistencia de PM2 en el sistema.
