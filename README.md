# Silma

Silma Web es una plataforma que facilita el proceso para la aceptación de escritos dentro de la empresa Silma Editorial, dando seguimiento por medio de retroalimentación de lectores y administradores que guían al escritor durante el proceso.

## Table of contents

* [Detalle de Clientes](#detalle-de-clientes)
* [URLS del Ambiente](#urls-del-ambiente)
* [Antlers](#antlers)
* [Tecnología Utilizada](#tecnología-utilizada)
* [Management resources](#management-resources)
* [Setup the project](#setup-the-project)
* [Restoring the database](#restoring-the-database)
* [Debugging](#debugging)
* [Running specs](#running-specs)


### Detalle de Clientes

| Nombre             | Email                | Rol              |
| ------------------ | -------------------- | ---------------- |
| Lorena Martínez    | lorenamtze@tec.mx    | CEO              |
| Yolanda Chapa      | yoli.chapa@gmail.com | Editora en Jefe  |


### URLS del Ambiente

* **Producción** - [TBD](TBD)
* **Desarrollo** - [TBD](TBD)

### Antlers

| Nombre         | Email                         | Rol                     | 
| -------------- | ----------------------------- | ------------------------|
| Luisa Pineda   | fernandapinedaochoa@gmail.com | Scrum Master            |
| Iván Ramírez   | ivanrmzmtz@gmail.com          | Admin. de Proyecto      |
| Uriel Salazar  | usurquidi.96@gmail.com        | Admin. de Configuración |
| Alfredo Ávila  | a00818666@itesm.mx            | Product Owner Proxy     |

### Tecnología Utilizada
| Tecnologia    | Versión      |
| ------------- | -------------|
| Node Js       | 12.15        |
| Mongoose      | 5.9.6        |
| Express       | 4.17.1       |
| VueJs         | 2.6          |
| Vuetify       | 2.2.17       |

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
$ git clone https://github.com/ProyectoIntegrador2018/silma.git
```

2. Fire up a terminal and run for development:

```bash
$ cd back
$ npm install
$ npm run serve
```

2. Fire up another terminal and run:
```bash
$ cd front
$ npm install
$ npm run serve
```

3. Open MongoDB Community Edition in order to manage the DB and write:

```
% mongodb://localhost/silma
```

### Restoring the database

### Debugging

### Running specs
