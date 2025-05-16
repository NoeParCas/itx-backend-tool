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
