## System Design

For this project, we opted to use Docker for containerization. We chose Docker because it is a popular containerization tool that is easy to use and is well documented. We also chose to use Docker Compose to manage our containers. Docker Compose is a tool that allows us to define and run multi-container Docker applications. These are defined in a YAML file, which we have included in our repository as docker-compose.yml. This file defines the services that make up our application, as well as how these services interact. We have included a brief description of each service below.

### Database

```
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    networks:
      - backend

volumes:
  db-data:
```

The database service is a MongoDB container. It is a document-oriented NoSQL database that stores data in JSON-like documents. The MongoDB container is connected to the backend network, which allows the backend service to communicate with the database. The MongoDB container also has a volume attached to it, which allows the database to persist data even if the container is stopped or removed.

## Gateway

We achieve a gateway by depoling nginx as a reverse proxy. The gateway is responsible for routing requests to the appropriate service. It is also responsible for authentication and authorization through Cross-Origin Resource Sharing (CORS).  CORS is a mechanism that uses additional HTTP headers to services where to accept requests from. In this way, services should only accept requests through the gateway.


```
proxy:
    build: ./proxy
    ports:
      - "80:80"
    networks:
      - frontend
      - backend
    depends_on:
      - vehicleapp
      - user_app
      - booking_app
```



The gateway service is connected to the frontend and backend networks, which allows it to communicate with the frontend and backend services and making them accessible to the outside world. Also notice how this service depends on the vehicleapp, user_app, and booking_app services. This means that the gateway service will not start until the vehicleapp, user_app, and booking_app services are running.


## Frontend Service

The frontend service is a Python CLI that is responsible for the user interface. It is strictly only connected to the frontend network, which allows it to communicate with the authorized endpoint, the gateway service. 


```
frontend:
    build: ./gorju/frontend
    tty: true
    stdin_open: true
    environment:
      - PYTHON_ENV=container
    networks:
      - frontend
    depends_on:
      - proxy
```

This service depends on the proxy service meaning that the frontend service will not start until the proxy service is running.


## User service

The user service is a node application running on the Express framework. "Express.js is a small framework that works on top of Node.js web server functionality to simplify its APIs and add helpful new features. It makes it easier to organize your application’s functionality with middleware and routing. It adds helpful utilities to Node.js HTTP objects and facilitates the rendering of dynamic HTTP objects."_1 https://www.geeksforgeeks.org/express-js/

```
  booking_app:
    build: ./gorju/booking-management
    environment:
      - SERVICE_PORT=${SERVICE_PORT}
      - DATABASE_URL=mongodb://mongodb:27017/gorju-cars
    networks:
      - backend
    depends_on:
      - mongodb
```

The user service is connected to the backend network, which allows it to communicate with the database service. This service also depends on the database service, meaning that the user service will not start until the database service is running.

## Vehicle service

The vehicle service is a Java application using the Spring-Boot framework. It is managed using the maven build tool. By compiling a standalone jar file, we can run the application using the java -jar command inside the container.

```
vehicleapp:
    build: ./gorju/vehicle-management
    environment:
      - SERVICE_PORT=${SERVICE_PORT}
    networks:
      - backend
```

This service takes control of the main resources of the application. It is responsible for the CRUD operations of the vehicles. It is connected to the backend network, which allows it to communicate with the other services.
§

## Booking service

Similarly to the user service, the booking service is a Node.js application running on the Express.js framework. 

```
  booking_app:
    build: ./gorju/booking-management
    environment:
      - SERVICE_PORT=${SERVICE_PORT}
      - DATABASE_URL=mongodb://mongodb:27017/gorju-cars
    networks:
      - backend
    depends_on:
      - mongodb
```

This services, serves as a facade for the whole system. Once the independent resources, namely users and vehicles, are created, the booking service is responsible for the creation of the bookings. By connecting to the rest of the services, it's also to query properties such as vehicle price and availability and user information using only their IDs. This is possible due to it being connected to the backend network, and serving as its glue. 