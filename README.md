# itx-backend-tool
Tool capable of sorting a collection of resources (products) based on multiple weighted criteria dynamically defined by the API client.

## 🚀 Start app
The application uses a `Makefile` to automate common development tasks. Below are the steps to build and run the project.

### 🔧 Build the application
```bash
make build
```
### ▶️ Start the application 
```bash
make start
```
### 🛠 Run database migrations
```bash
make run-migrations
```
(Optional) Install dependencies if needed:
If dependencies are not installed properly, run:

```bash
make install
```

Once the app is up and running, it will be available on port `5001`.

[/status](http://localhost:5001/status)

## 🛑 Stop app
To stop the app and clean up Docker images please run:

```bash
make stop
```

```bash
make clean
```

## 🧠 Solution design

* Language: TypeScript
* Architecture: RESTful API using CQRS (Command Query Responsability Segregation)

### Why POST? 
The main endpoint is a `POST` request that receives sorting weights in the request body.
A `POST` was chosen instead of `GET` because:

* The weights might vary and grow over time.
* These parameters are part of an operation, not a resource fetch.
* URLs have length limitations that don´t affect request bodies.
* The endpoint performs an action rather than just retrieving data.

### Clean architechture
The project follows the CQRS for clear separation of concerns:
* Queries are used for retrieving data (like product listing)
* Uses dependency injection for better flexibility and testability (via `node-dependency-injection` package)

### Database
* PostgreSQL is used as the main database
* Knex is used as the query builder and migration tool.
* After starting the application, all existing migrations are run to:
    - Create the schema and tables
    - Insert the inital challenge data into the database
