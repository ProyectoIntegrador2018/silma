# Silma

Silma Web is a platform that facilitates the process for the acceptance of texts within the Silma Editorial company, giving follow-up through feedback from readers and administrators who guide the writer in the process of publishing.

## Table of contents

* [Client Information](#Client-Information)
* [Enviornment URLS](#Enviornment-URLS)
* [Antlers](#Antlers)
* [Zelda Labs](#Zelda-Labs)
* [Technologies](#Technologies)
* [Management tools](#management-tools)
* [Setup the project](#setup-the-project)
* [Restoring the database](#restoring-the-database)


### Client Information

| Name               | Email                | Role             |
| ------------------ | -------------------- | ---------------- |
| Lorena Martínez    | lorenamtze@tec.mx    | CEO              |
| Yolanda Chapa      | yoli.chapa@gmail.com | Editora en Jefe  |


### Enviornment URLS

* **Production** - [Silma Heroku App](https://silma.herokuapp.com/)


### Antlers 
#### (Febrero - Junio 2020)

| Name           | Email                         | Role                    | 
| -------------- | ----------------------------- | ------------------------|
| Luisa Pineda   | fernandapinedaochoa@gmail.com | Scrum Master            |
| Iván Ramírez   | ivanrmzmtz@gmail.com          | Admin. de Proyecto      |
| Uriel Salazar  | usurquidi.96@gmail.com        | Admin. de Configuración |
| Alfredo Ávila  | a00818666@itesm.mx            | Product Owner Proxy     |


### Zelda Labs
#### (Agosto - Diciembre 2020)

| Name             | Email                          | Role                                 | 
| ---------------- | ------------------------------ | -------------------------------------|
| Jorge Iribe      | A00820365@itesm.mx             | Scrum Master                         |
| Francisco Castro | a01281649@itesm.mx             | Product Owner Proxy                  |
| Renato Sánchez    | renatosancheznevarez@gmail.com | Admin. de Configuración y deProyecto |

### Mongod 
#### (Febrero - Junio 2021)

| Name           | Email                         | Role                    | 
| -------------- | ----------------------------- | ------------------------|
| Héctor León    | a01251806@itesm.mx            | Scrum Master            |
| Ulises Serrano |  a01233000@itesm.mx           | Admin. de Proyecto      |
|                |                               | Admin. de Configuración |
|                |                               | Product Owner Proxy     |



### Technologies
Front end:
| Technology    | Version      |
| ------------- | -------------|
| Node Js       | 12.15        |
| Express       | 4.17.1       |
| VueJs         | 2.6          |
| Vuetify       | 2.2.17       |
| vue-router    | 3.1.5        |
| Axios         | 0.19.2       |
|moment         |2.26.0        |

Back-end:
| Technology    | Version      |
| ------------- | -------------|
| Node Js       | 12.15        |
| Mongoose      | 5.9.6        |
| Express-jwt   | 5.3.3        |
| jsonwebtoken  | 8.5.1        |
| bcrypt        | 4.0.1        |
|email-templates| 7.0.5        |

### Management tools

You should ask for access to this tools if you don't have it already:

* [Github repo](https://github.com/)
* [Backlog]()
* [Heroku](https://crowdfront-staging.herokuapp.com/)
* [Documentation](https://drive.com)

## Development

### Setup the project

You'll need to install node js and MongoDB Community Edition to be able to continue developing the project

After installing you can follow this simple steps:

1. Clone this repository into your local machine

```bash
git clone https://github.com/ProyectoIntegrador2018/silma.git
```

2. Add a `.env.local` file inside `back` folder. Inside this file add all the credentials needed, such as: `SECRET_JWT`, `MONGODB_URI`, etc.
<b>IMPORTANT: </b><i>This is needed for the server and database to work.</i>

3. Request the AWS login information to Lorena Martínez. It's now required for you to download `AWS CLI` and configure the SILMA account using the following guide: https://docs.aws.amazon.com/es_es/cli/latest/userguide/cli-chap-configure.html 

4. Fire up a terminal and run for development:

```bash
cd back
npm install
npm run serve
```

5. Fire up another terminal and run:
```bash
cd front
npm install
npm run serve
```

6. Open MongoDB Community Edition in order to manage the DB and write:

```
% mongodb://localhost/silma
```

7. To generate some testing data run:
```bash
cd back
npm run generate
```
This will create 2 admins, 2 readers, 2 writers, 2 texts and suggestions.

### Restoring the database

- Make sure MongoDB is running in Replica Set mode
- Drop the database
- Restart the server. 

The server will automatically run the datainit and fill the DB with the mock data.
