## Description

This is a backend application for an e-commerce which is developed as an approval objective for module 4 of the Henry bootcamp.

It is developed with the NestJS framework and is aimed at managing endpoints for requests related to the registration, authentication and validation of users, products and purchase orders. Below are the steps to follow to test the application.

## Installation

```bash
$ npm install
```

## Running the app from localhost

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running the app from Docker Containers

Please note that you must have docker desktop installed in order to use this configuration.

Remember that you have to create an .env.development file which set the enviroment variables.

```bash
# To initialize the service
$ docker compose up --build

# To stop the service
$ docker compose down

```

## Test

¡Testing was not implemented!

## Stay in touch

- Author - [SebasPCDev](https://www.linkedin.com/in/spalomaresc/)

## License

Nest is [MIT licensed](LICENSE).
