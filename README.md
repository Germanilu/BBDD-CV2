# Toc
- [Toc](#toc)
- [Veterinary Clinic](#veterinary-clinic)
- [How to use it](#how-to-use-it)
- [Endpoints](#endpoints)
  - [Auth User](#auth-user)
  - [User](#user)
  - [User Actions](#user-actions)
    - [Pets](#pets)
    - [Consult](#consult)
    - [Booking](#booking)
  - [Veterinary Actions](#veterinary-actions)
    - [Pets](#pets-1)
    - [Consult](#consult-1)
    - [Booking](#booking-1)
  - [Super Admin Actions / Owner Actions](#super-admin-actions--owner-actions)
  - [Author](#author)
      - [Luciano Germani :it:](#luciano-germani-it)

# Veterinary Clinic 

*If you prefer you can read this in* [Spanish](README-ESP.md)

This project, it's the BBDD of a Veterinary Clinic made with Express & MongoDB

If you would like to try the complete application, please refer to this github repository where you will find all the information and the link to the deployed app --> https://github.com/Germanilu/ClinicaVeterinariaDueMari



----------------------------

# How to use it

To be able to use it you will need to install Postman (https://www.postman.com/) and aim to this Heroku server: https://bbdd-cv2.herokuapp.com


# Endpoints

Here you can find all the methods you can use on Postman to be able to do your research.

## Auth User

    Method: POST

    URL:  /api/auth/register --> To register an account
    BODY {"name": " ", "surname":" ", "mobile": " ", "address": " ", "city":" ", "email": " ", "password": " " }  

    ---------------------------------------------------------------

    Method: POST

    URL: /api/auth/login  --> User can login with his account  
    BODY {"email": " ", "password": " " }  
    ---------------------------------------------------------------

    Method: GET

    URL: /api/auth/profile --> User can see his profile


## User

    Method: PUT

    URL:  /api/users/:userId --> User can modify his own profile

    ---------------------------------------------------------------

    Method: Delete

    DELETE /api/users/:userId --> User can delete his account
    ---------------------------------------------------------------

## User Actions

### Pets

    Method: POST

    URL:  /api/pet/register --> User can register a new pet
    BODY {"name": " ", "type":" ", "breed": " ", "age": " ", "weight":" ", "diseases": " "}  

    ---------------------------------------------------------------

    Method: PUT

    URL: /api/pet:Pet  --> User can edit the pet info.
    BODY {"name": " ", "type":" ", "breed": " ", "age": " ", "weight":" ", "diseases": " "}  
    ---------------------------------------------------------------

    Method: DELETE

    URL: /api/pet:idPet --> User can delete the pet

    ---------------------------------------------------------------

    Method: GET

    URL: /api/pet:idPet --> User can get the information of the pet

    URL: /api/myPets --> User can get all the pets he registered

### Consult

    Method: POST

    URL:  /api/newConsult --> User can create a new consult
    BODY {"date": " ", "message":" "}  
    ---------------------------------------------------------------
    
    Method: GET

    URL: /api/myConsult --> User can get all his consults

    ---------------------------------------------------------------
    
    Method: DELETE

    URL: /api/myConsult/:idConsult --> User can delete the consult

### Booking

    Method: POST

    URL:  /api/booking --> User can book an appointment
    BODY {"date": " ", "hour":" "}  
    ---------------------------------------------------------------
    
    Method: GET

    URL: /api/myBooking --> User can get all his appointment

    ---------------------------------------------------------------
    
    Method: DELETE

    URL: /api/booking/:idBooking --> User can delete the appointment

## Veterinary Actions

### Pets

    Method: GET

    URL: /api/pets:petId --> Veterinary can retrive the pet information

    URL: /api/pet/:userId --> Veterinary can retrive all the pets by the userId

### Consult

    Method: PUT

    URL: /api/consult/:idConsult --> Veterinary can reply to the user consult
    BODY {"vetMessage": " "}  
    ---------------------------------------------------------------

    Method: GET

    URL: /api/allConsults --> Veterinary can retrive all the unreply Consults

    URL: /api/consult --> Veterinary can retrive all the consults he already reply

### Booking

    Method: GET

    URL: /api/booking/ --> Veterinary can retrive all the existing appointment



## Super Admin Actions / Owner Actions

    Method: POST

    URL:  /api/newVet --> Super Admin can register a new Veterinary
    BODY {"name": " ", "surname":" ", "specialization": " ", "email": " ", "password":" "}  

    ---------------------------------------------------------------

    Method: DELETE

    URL: /api/vet/:vetId --> Super Admin can delete a veterinary by his id

    ---------------------------------------------------------------

    Method: GET

    URL: /api/vet --> Super Admin can get all the veterinary 

    URL: /api/users --> Super Admin can get all the existing users

    URL: /api/pets --> Super Admin can get all the existing pets

    URL: /api/vet/:vetId --> Super Admin can get a veterinary by his id

    URL: /api/users/:userId --> Super Admin can get a user by his id

    URL: /api/pet/:petId --> Super Admin can get a pet by his id



## Author 	

#### [Luciano Germani](https://github.com/Germanilu) :it:
 

---------------------

[:top:](#toc)