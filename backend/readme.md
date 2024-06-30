# Django Template
El presente proyecto es un template de Backend de una Aplicación en Django Rest Framework que incluye Django (ver https://www.django-rest-framework.org), Postgres y PgAdmin
## Requerimientos
Docker y Docker Compose
## Construir los contenedores
Para construir los contenedores se debe ejecutar:
~~~
docker-compose up --build
~~~
## Levantar los servicios
Para levantar los servicios se debe ejecutar
~~~
docker-compose up
~~~
Para levantar en background
~~~
docker-compose start
~~~
Para desplegar logs
~~~
docker-compose logs -f
~~~
## Crear Súper Usuario
Para crear el un súper usuario se debe ejecutar el siguiente comando en la raíz del proyecto:
~~~
docker-compose exec django-api python3 manage.py createsuperuser
~~~
# Configuración de Oauth
El backend de Buen Trip ya viene con Django Oauth Toolkit instalado. Para más documentación ver https://django-oauth-toolkit.readthedocs.io/en/latest/
## Crear App Client
- Ir a \<url>/o/applications/
- Ingresar credenciales de súper usuario (en caso que se solicite)
- Hacer clic en el enlace de crear nueva app
- Copiar el client id y el client secret a una app específica
- En grant type seleccionar: "Resource owner password-based"
- Presionar en "Save"
- Probar usando las colecciones y los ambientes de postman usando la llamada de login, remplazando el username y el password por los que coincidan con su súper usuario
- Si la prueba es exitosa el backend devolverá la siguiente respuesta:
~~~
{
    "access_token": "XXXXXXXXXXXX",
    "expires_in": 2592000,
    "token_type": "Bearer",
    "scope": "read write",
    "refresh_token": "VRLO6mjBWiE6ovFFyT8VNuivZhkF91"
}
~~~

## Ejecutar comandos de django
Todos los comandos de django deben ir precedidos de
~~~
docker-compose exec django-api
~~~
Si se observa en docker-compose-yml django-api es el contenedor que maneja django.
### Ejemplo
Para crear una nueva app dentro del proyecto actual se debe ejecutar
~~~
docker-compose exec django-api python3 manage.py startapp <nombre_de_la_app>
~~~

# PgAdmin y Postgres
El orquestador de este proyecto ya incluye postgres y pgadmin. Las credenciales se pueden encontrar y modificar en `docker-compose.yml`, así como los archivos de ambiente de la carpeta `.envs/`