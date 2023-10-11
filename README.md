
# Prueba Frontend - Jorge Poveda

## Breve explicación
Desarrollo web con el fin de cumplir 2 historias de usuario entregadas por el evaluador (Administración de alojamientos hoteles locales y Reserva de hoteles)

Se desarrollaron 2 tipos de roles:

- Admin (permite crear, modificar, activar o inactivar hotel y habitaciones, también puede cancelar y completar las reservas)
- Travel(cliente) (es quien usa la página, usando el filtro de búsqueda para así encontrar los hoteles si existen en la ciudad que está buscando para realizar las reservas)

## Vesiones 

**Front:** React, TypeScript, node v18, en la prueba había 2 opciones Angular o React con TypeScript, la eleccion final fue por asumir un reto y desarrollar el app en React, ya que no cuento con experiencia en esta tecnología a diferencia de Angular.

**Database:** Firebase, se eligió esta opción por facilidad a la hora de guardar información, puesto que la prueba es de frontend, no se destinó mucho tiempo de desarrollo de consultas y servicios.


## Instalaccion y ejecucion

Frontend
```bash
  yarn 
  yarn start
```
Ingresar a http://localhost:3000


## Importante!

Tenga en cuenta que no se subieron las credenciales al repositorio, para una correcta ejecución del proyecto en local se debe crear un archivo .env y asignarle las credenciales de firestore.

Comparto la estructura del archivo .env

```bash
// credenciales de firestore
REACT_APP_API_KEY_FIREBASE=
REACT_APP_MESSAGING_SENDER_ID=
REACT_APP_APP_ID=



//credenciales de emailjs.com
REACT_APP_API_EMAIL=
REACT_APP_EMAIL_SERVICE=
REACT_APP_EMAIL_INFO=
REACT_APP_EMAIL_RED=
```

las credenciales de emailjs.com son solo para el envío de emails, este no debe afectar el funcionamiento de la app a excepción del envío de correos