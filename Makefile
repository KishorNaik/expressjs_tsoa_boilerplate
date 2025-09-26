# App name can be overridden. ex: make build-all APP_NAME=<your-app-name>
SHELL := /bin/bash

APP_NAME = typescript-express
APP_NAME := $(APP_NAME)

.PHONY: help up down build-all build-api build-bullmq build-cronjob build-all-dev build-api-dev build-bullmq-dev build-cronjob-dev run-api stop-api clean remove test

help:
	@grep -E '^[1-9a-zA-Z_-]+:.*?## .*$$|(^#--)' $(MAKEFILE_LIST) \
	| awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m %-43s\033[0m %s\n", $$1, $$2}' \
	| sed -e 's/\[32m #-- /[33m/'

#-- General Commands
test: ## Run the npm test script
	npm test

#-- Docker Compose
up: ## Up all container images via docker-compose
	docker-compose up -d

down: ## Down all container images via docker-compose
	docker-compose down

#-- Production Builds
build-all: build-api build-bullmq build-cronjob ## Build all production container images

build-api: ## Build the api container image - Production
	docker build -t ${APP_NAME}-api -f Dockerfile.api.prod .

build-bullmq: ## Build the bull-mq container image - Production
	docker build -t ${APP_NAME}-bullmq -f Dockerfile.bullMq.prod .

build-cronjob: ## Build the cron-job container image - Production
	docker build -t ${APP_NAME}-cronjob -f Dockerfile.cronJob.prod .

#-- Development Builds
build-all-dev: build-api-dev build-bullmq-dev build-cronjob-dev ## Build all development container images

build-api-dev: ## Build the api container image - Development
	docker build -t ${APP_NAME}-api -f Dockerfile.api.dev .

build-bullmq-dev: ## Build the bull-mq container image - Development
	docker build -t ${APP_NAME}-bullmq -f Dockerfile.bullMq.dev .

build-cronjob-dev: ## Build the cron-job container image - Development
	docker build -t ${APP_NAME}-cronjob -f Dockerfile.cronJob.dev .

#-- Docker Actions
run-api: ## Run the api container image
	docker run -d -it -p 3000:3000 ${APP_NAME}-api

stop-api: ## Stop and remove the api container
	docker container rm -f ${APP_NAME}-api

clean: ## Clean all project container images
	docker rmi -f ${APP_NAME}-api ${APP_NAME}-bullmq ${APP_NAME}-cronjob

remove: ## Remove docker-compose volumes
	docker volume rm -f ${APP_NAME}
