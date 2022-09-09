# Toc
- [Toc](#toc)
- [Clinica Veterinaria](#clinica-veterinaria)
- [Como usarla](#como-usarla)
- [Busquedas](#busquedas)
  - [Identificación de Usuario](#identificación-de-usuario)
  - [Usuario](#usuario)
  - [Usuario](#usuario-1)
    - [Mascotas](#mascotas)
    - [Consultas](#consultas)
    - [Reservas](#reservas)
  - [Veterinario](#veterinario)
    - [Mascotas](#mascotas-1)
    - [Consultas](#consultas-1)
    - [Reservas](#reservas-1)
  - [Super Admin](#super-admin)
  - [Autor](#autor)
      - [Luciano Germani :it:](#luciano-germani-it)

# Clinica Veterinaria

*Si lo prefieres puedes leer esto en* [English](README.md)

Este proyecto es la base de datos de una clínica veterinaria hecho con Express y MongoDB

Si te gustaría ver la aplicación completa, te aconsejo ver este repositorio de github donde encontraras todas las informaciones y el link para ver la aplicación --> https://github.com/Germanilu/ClinicaVeterinariaDueMari



----------------------------

# Como usarla

Para poder usarla necesitarás instalar Postman ((https://www.postman.com/) y apuntar a este servidor de heroku: https://bbdd-cv2.herokuapp.com



# Busquedas

Aquí puede encontrar todos los métodos que puede usar en Postman para poder hacer sus búsquedas.

## Identificación de Usuario

    Method: POST

    URL:  /api/auth/register --> Para registrar un nuevo usuario
    BODY {"name": " ", "surname":" ", "mobile": " ", "address": " ", "city":" ", "email": " ", "password": " " }  

    ---------------------------------------------------------------

    Method: POST

    URL: /api/auth/login  --> Para hacer el login del usuario
    BODY {"email": " ", "password": " " }  
    ---------------------------------------------------------------

    Method: GET

    URL: /api/auth/profile --> El usuario puede ver su perfil


## Usuario

    Method: PUT

    URL:  /api/users/:userId --> El usuario puede modificar su perfil

    ---------------------------------------------------------------

    Method: Delete

    DELETE /api/users/:userId --> El usuario puede borrar su perfil
    ---------------------------------------------------------------

## Usuario

### Mascotas

    Method: POST

    URL:  /api/pet/register --> El usuario puede registrar una nueva mascota
    BODY {"name": " ", "type":" ", "breed": " ", "age": " ", "weight":" ", "diseases": " "}  

    ---------------------------------------------------------------

    Method: PUT

    URL: /api/pet:Pet  --> El usuario puede modificar los datos de la mascota
    BODY {"name": " ", "type":" ", "breed": " ", "age": " ", "weight":" ", "diseases": " "}  
    ---------------------------------------------------------------

    Method: DELETE

    URL: /api/pet:idPet --> El usuario puede borrar la mascota

    ---------------------------------------------------------------

    Method: GET

    URL: /api/pet:idPet --> El usuario puede ver los datos de una mascota con su id

    URL: /api/myPets --> El usuario puede ver los datos de todas las mascotas registradas

### Consultas

    Method: POST

    URL:  /api/newConsult --> El usuario puede hacer una nueva consulta 
    BODY {"date": " ", "message":" "}  
    ---------------------------------------------------------------
    
    Method: GET

    URL: /api/myConsult --> El usuario puede ver todas las consultas echas

    ---------------------------------------------------------------
    
    Method: DELETE

    URL: /api/myConsult/:idConsult --> El usuario puede borrar una consulta

### Reservas

    Method: POST

    URL:  /api/booking --> El usuario puede reservar una cita
    BODY {"date": " ", "hour":" "}  
    ---------------------------------------------------------------
    
    Method: GET

    URL: /api/myBooking --> El usuario puede ver todas las citas

    ---------------------------------------------------------------
    
    Method: DELETE

    URL: /api/booking/:idBooking --> El usuario puede borrar una cita

## Veterinario

### Mascotas

    Method: GET

    URL: /api/pets:petId --> El veterinario puede ver todas las informaciones de una mascota

    URL: /api/pet/:userId --> El veterinario puede ver todas las mascotas de un usuario

### Consultas

    Method: PUT

    URL: /api/consult/:idConsult --> El veterinario puede contestar a una consulta
    BODY {"vetMessage": " "}  
    ---------------------------------------------------------------

    Method: GET

    URL: /api/allConsults --> El veterinario puede ver todas las consultas no contestadas

    URL: /api/consult --> El veterinario puede ver todas las consultas a las que ya ha contestado

### Reservas

    Method: GET

    URL: /api/booking/ --> El veterinario puede ver todas las reservas



## Super Admin 

    Method: POST

    URL:  /api/newVet --> El Super Admin puede registrar un nuevo usuario
    BODY {"name": " ", "surname":" ", "specialization": " ", "email": " ", "password":" "}  

    ---------------------------------------------------------------

    Method: DELETE

    URL: /api/vet/:vetId --> El Super Admin puede borrar el usuario 

    ---------------------------------------------------------------

    Method: GET

    URL: /api/vet --> El Super Admin puede ver todos los veterinarios 

    URL: /api/users --> El Super Admin puede ver todos los usuarios

    URL: /api/pets --> El Super Admin puede ver todos las mascotas

    URL: /api/vet/:vetId --> El Super Admin puede recuperar un veterinario por id 

    URL: /api/users/:userId --> El Super Admin puede recuperar un usuario por id 

    URL: /api/pet/:petId -->El Super Admin puede recuperar una mascota por id 



## Autor	

#### [Luciano Germani](https://github.com/Germanilu) :it:
 

---------------------

[:top:](#toc)