# Orders microservice

This a minimal microservice project built with NodeJS, ExpressJS and RabbitMQ as message broker.

## Requirements

To run this this project:

1.  Nodejs 18.x or later
2.  MySQL 7.x or later (Can use a docker image)
3.  RabbitMQ (Message broker)

## Getting started

1. Clone this repository, navigate inside the folder and run:
   `npm install`
   This command will install all NodeJS dependencies

2. Setup enviroment variables
   `DATABASE_URL="mysql://user:password@localhost:3306/ordersdb"`
   `RABBITMQ_URL="amqp://localhost"`
   `PORT=4003`

3. Migrate prisma database tables:
   `npx prisma migrate`

4. Run the project
   `npm run dev`

## API documentation

The API specification used in this project is Swagger, but the project has two visualizations:

1.  The regular SwaggerUI, can be found at (https://localhost:PORT/api-docs)
2.  Redocly user interface, a more appealing design but it doesn't come with the feature to test the API, and can be found at (http://localhost:PORT/docs)
