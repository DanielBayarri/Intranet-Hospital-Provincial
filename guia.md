# Tecnologías

## FrontEnd
- Angular 18
- Native Federation (paara los microfronts)
- PrimeNg y PrimeIcons (libreria de componentes y de iconos.)
- Tailwind (dependencia de desarrollo, para estilar mas rapido a la hora del desarollo con clases)

## Backend
- Nestjs 10
- TypeOrm 
- Passport JWT (para los json web tokens)

## BBDD 
- MySql


# Estructura carpetas

## Backend
**dist**
Donde se genera el directorio para producción

*src*

app -> Entradas principales de la aplicación

**auth**
modulo de el login y la creación y comprobación del token. Tambien incluye la interfaz (de typescript) y el guard de comprobación

**config**
Archivos de configuración de BBDD y LDAP

**modules**
Todos los modulos de la aplicación. 

Esos modulos contienen:
- dto -> validaciones del objeto que tiene que mandarse en las peticiones(lo que esperamos)
- entities -> La entidad de esa tabla
- controller -> Donde indicamos la ruta y los endpoints.
- module -> donde importamos los servicios e entidades que vamos a necesitar.
- service -> Las funciones que utilizaremos.

## Frontend

**dist**
Donde se genera el directorio para producción

*projects*
Carpeta que se utiliza en los proyectos con microfronts. En angular normal veras que es parecida a nest con app src

**host**
Proyecto principal
Login e intranet pagina principal.

**regin**
*Aplicaciones secundarias
Aplicacion de RegIn

**shared**
Utilidades utilizadas en toda la aplicación
- environments -> donde esta la variable para las peticiones 
- guards -> restricciones para las rutas
- interfaces -> para el tipado estricto (Typescript)
- pipes -> utilidades para el html en angular

### HOST

**public**
- Imagenes e iconos
- federation.manifest.json -> archivo que indica las rutas de las aplicaciones secundarias

**src**
- Los archivos de configuracion y principales de la aplicacion de angular

**app**
app.*** -> Los componentes y modulos principales de la aplicación
app.routes.ts -> las rutas de la aplicación

 - Auth -> componente login mas su servicio
 - assets -> archivos con datos (habria que pasarlos a BBDD)
 - home -> los componetes y estructura de la aplicación
    - components -> componentes reutilizables
    - layout -> componentes de estructura de la pagina
    - pages -> paginas internas (mi usuario, listado telefonos...)

## RegIn

Igual que host, pero añade:

**core**
Carpeta con los servicios de todos los endpoints de la api
Servicio de generación de pdfs

**Home**
Layout principal

**pages**
Todas las paginas de la aplicacion (separradas por carpeetas segun rol)


# Subir a Producción

## Backend

- Consola
**Ir a la ruta del backend backend**

pm2 stop 0

npm run build (Para hacer el build del proyecto)

pm2 start dist/main.js

