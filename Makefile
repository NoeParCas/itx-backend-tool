SHELL := $(shell which bash)
CONTAINER ?= itx-backend-tool-api

default: build

install:
	npm install

build:
	docker compose build --no-cache

clean:
	docker compose down --rmi local --volumes --remove-orphans

start:
	docker compose up $(CONTAINER)

stop:
	docker compose stop

lint:
	docker compose exec $(CONTAINER) npm run lint

feature-test:
	docker compose exec $(CONTAINER) npm run test:feature:itxBackendToolApi

unit-test:
	npm run test:unit

generate-migration:
	docker compose exec $(CONTAINER) ./node_modules/db-migrate/bin/db-migrate \
	--config ./src/Itx/Infrastructure/Persistence/Postgres/database.json \
	-e docker create $(migrationName) -m ./src/Itx/Infrastructure/Persistence/Postgres/Migrations \
	--sql-file -v

run-migrations:
	docker compose exec $(CONTAINER) ./node_modules/db-migrate/bin/db-migrate \
	--config ./src/Itx/Infrastructure/Persistence/Postgres/database.json \
	-e docker up -m ./src/Itx/Infrastructure/Persistence/Postgres/Migrations -v

revert-all-migrations:
	docker compose exec $(CONTAINER) ./node_modules/db-migrate/bin/db-migrate \
	--config ./src/Itx/Infrastructure/Persistence/Postgres/database.json \
	-e docker reset -m ./src/Itx/Infrastructure/Persistence/Postgres/Migrations -v

