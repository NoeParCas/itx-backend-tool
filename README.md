# itx-backend-tool
Tool capable of sorting a collection of resources (products) based on multiple weighted criteria dynamically defined by the API client.

## Start app
The application setup is automated using a Makefile. Below are the required steps:

```bash
make build
```

```bash
make start
```

(Optional) Install dependencies if needed:
If dependencies are not installed properly, run:

```bash
make install
```

Once started, the application runs on port 5001. You can check its health status via:

[/status](http://localhost:5001/status)

## Stop app
For stoping and cleaning the docker images please run:

```bash
make stop
```

```bash
make clean
```

## Solution design

POST request // CQRS