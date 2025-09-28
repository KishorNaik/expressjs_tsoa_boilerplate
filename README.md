# ExpressJs Boilerplate Powered by TSOA

![Node.js](https://img.shields.io/badge/Node.js-22.x-green.svg) ![Express.js](https://img.shields.io/badge/Express.js-5.1-green.svg) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg) ![License](https://img.shields.io/badge/License-Apache--2.0-yellow.svg) ![CommonJS](https://img.shields.io/badge/Module%20System-CommonJS-blue.svg) ![Docker Compatible](https://img.shields.io/badge/Docker-Compatible-brightgreen.svg)




## 🚀 Overview

This boilerplate is designed to help you hit the ground running when building RESTful APIs using Express.js, TypeScript, and TSOA with Modular architecture. It’s structured for clarity, scalability, and ease of onboarding, especially for teams working in fast-paced startup environments.

Whether you're spinning up a new service or standardizing API development across projects, this starter kit gives you a solid foundation with:

- **Express.js** for flexible, battle-tested HTTP handling
- Type-safe routing powered by **TSOA**
- Clean project structure that encourages maintainability
- Ready-to-use Middlewares: The boilerplate includes a set of pre-configured middlewares for common tasks such as logging, error handling, security, and request validation.
- Integrated logger
- Built-in support for **Swagger/OpenAPI** documentation
- The boilerplate includes ready-to-use support for various background and messaging workflows:
    - **BullMQ** – A fast and robust queue system for Redis
    - **Cron Jobs** – Time-based job scheduling for recurring tasks
    - **RabbitMQ** – A popular message broker for decoupled services
    - **Kafka** – A distributed streaming platform for high-throughput event pipelines
    - **Pusher** – A real-time messaging service for push notifications and live updates
    - **In-memory Event Dispatcher** for lightweight pub-sub flows
- Developer-friendly Tooling: The boilerplate is configured with a set of tools to improve the developer experience, including:
    - **SWC** – A super-fast Rust based JavaScript/TypeScript compiler for blazing-fast builds
    - **ESLint** – A pluggable linter for catching bugs and enforcing code style
    - **Prettier** – An opinionated code formatter for clean, readable code
    - **Husky** – Git hook support for pre-commit checks and automation
    - **PM2** – A production-grade process manager for Node.js apps
- **Devcontainer** support for consistent local development in VS Code
- **Docker** base images for both development and production environments, optimized for build speed and runtime performance
- The boilerplate integrates with a custom open-source **NPM utility packages** to simplify common tasks and enhance developer experience.

This isn’t just a code dump. It’s a thoughtfully crafted starting point for teams who care about velocity, safety, and developer experience.

---

## 📌 Prerequisites

Before diving into the code, we strongly recommend familiarizing yourself with a few key concepts and libraries that form the foundation of this boilerplate. This will help you write clean, maintainable code and make the most of the built-in tooling.

### 🧱 Modular Approach

This boilerplate is built with modularity in mind. Each feature or endpoint is designed to live in its own self-contained slice making it easier to reason about, test, and maintain. You are free to organize your code however you like, but we strongly encourage a modular mindset to keep things clean and scalable.

### 🧭 Vertical Slice Architecture Design

This project encourages but doesn’t enforce. A vertical slice architecture guided by SOLID principles. That means structuring your code by feature (not by layer), keeping responsibilities isolated, and designing endpoints that are easy to reason about and maintain.

If you are already familiar with SOLID, great. You will feel right at home. If not, don’t worry. You’ll pick up the patterns naturally as you explore the codebase and supporting utilities.

### 📚 Core Packages (Bundled via @kishornaik/utils)

To support this architecture, the boilerplate integrates several powerful open-source libraries — all bundled into the `@kishornaik/utils` package (https://github.com/KishorNaik/utils). This utility library is the backbone of the boilerplate, offering batteries-included support for predefined models, validation, error handling, messaging workflows, helper functions, and more. Before jumping into the code, we recommend exploring the following repositories to understand their concepts and usage:

Here’s a quick overview of what’s inside:

| Packages                                                        | Summary                                                                                                              | Must Know |
| --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | --------- |
| [tsoa](https://github.com/lukeautry/tsoa)                       | Type-safe routing and OpenAPI generation for Express.js using TypeScript decorators.                                 | ✅        |
| [mediatr-ts](https://github.com/m4ss1m0g/mediatr-ts)            | Implements the mediator pattern for decoupled request handling using commands, queries, and handlers. (CQRS Pattern) | ❌        |
| [neverthrow](https://github.com/supermacro/neverthrow)          | Functional error-handling with typed `Result` objects — safer than throwing exceptions.                              | ✅        |
| [typedi](https://github.com/typestack/typedi)                   | Dependency injection container for TypeScript, enabling clean service registration and resolution.                   | ✅        |
| [linq](https://github.com/mihaifm/linq)                         | LINQ-style query library for expressive data transformations in JavaScript/TypeScript.                               | ❌        |
| [typeORM](https://typeorm.io/)                                  | Feature-rich ORM for TypeScript with support for decorators, migrations, and multiple databases.                     | ❌        |
| [class-validator](https://github.com/typestack/class-validator) | Declarative validation for TypeScript classes using decorators — perfect for DTOs and request schemas.               | ✅        |
| [Sinon.js](https://sinonjs.org/) | A powerful testing utility for creating spies, stubs, and mocks to control and inspect function behavior in unit tests.            | ✅        |
| [supertest](https://github.com/forwardemail/supertest) | A high-level HTTP assertion library for testing Express.js APIs with fluent syntax and built-in request chaining.            | ✅        |

Some of these are pre-integrated and exposed via `@kishornaik/utils` npm package, so you don’t need to install or wire them manually. Just import and go.
This package is fully open source and designed to empower developers with clean, reusable patterns; whether you're building a small service or scaling a platform.

---

## ⚙️ Installation & Setup

To get started with this boilerplate, follow the steps below to clone the repository and set up your development environment.

### 🔗 Clone the Repository

```bash
git clone https://github.com/KishorNaik/expressjs_tsoa_boilerplate.git
cd expressjs_tsoa_boilerplate
```

### 📁 Configure Environment Variables

Before running the project, create a `.env` file in the root directory and populate it with the required environment variables. Here's a sample configuration:

```bash
# PORT
NODE_ENV="development"
PORT=3000

# SERVER TIMEOUT
SERVER_TIMEOUT=15000
SERVER_KEEP_ALIVE_TIMEOUT=15000
SERVER_HEADERS_TIMEOUT=16000

# TOKEN
SECRET_KEY=your_secret_key
REFRESH_SECRET_KEY=refresh_secret_key

# LOG
LOG_FORMAT=dev
LOG_DIR=logs

# CORS
ORIGIN=*
CREDENTIALS=true

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=root
DB_DATABASE=pfb

# Redis
REDIS_HOST=127.0.0.1
REDIS_DB=0
REDIS_PORT=6379

# RabbitMQ
RABBITMQ_URL=amqp://guest:guest@localhost:5672

# AES
ENCRYPTION_KEY=set_your_encryption_key

# Rate Limit and Throttle
GLOBAL_WINDOW_MINUTES=15
RATE_LIMITER=150
SLOW_DOWN_DELAY_AFTER_HITS=75
SLOW_DOWN_INITIAL_DELAY_MS=300
SLOW_DOWN_MAX_DELAY_MS=3000

# Kafka
KAFKA_BROKER=localhost:9092

# Pusher
PUSHER_APP_ID=pusher_app_id
PUSHER_KEY=pusher_key
PUSHER_SECRET=pusher_secret
PUSHER_CLUSTER=pusher_cluster
```

📝 Note: Many of these environment variables are optional and only required if you're using the corresponding features:

- Database (PostgreSQL)
- Redis
- RabbitMQ
- Kafka
- Pusher

### 📦 Install Dependencies

Make sure you have Node.js (v22) and npm installed. Then run:

```bash
npm install
```

### 🧪 Verify Setup

```bash
npm run build
OR
npm run build:tsc

npm run dev
```

Once the server starts, you’ll have access to several built-in endpoints for monitoring and documentation:

| Endpoint     | URL                            | Description                                                                                                                                          |
| :----------- | :----------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| Health Check | http://localhost:3000/health   | Returns a simple status response to confirm the server is alive.                                                                                     |
| API Info     | http://localhost:3000/info     | Provides metadata about the API — version, environment, and other useful details.                                                                    |
| Metrics      | http://localhost:3000/metrics  | Shows metrics information for the current application.                                                                                               |
| Swagger Docs | http://localhost:3000/api-docs | Interactive API documentation generated via TSOA and OpenAPI.⚠️ Note: Swagger is only available in the development environment for security reasons. |

These endpoints are part of the boilerplate’s built-in observability and documentation layer — no extra setup required.

### 🐳 Optional: Devcontainer Setup

If you're using VS Code with Dev Containers, this project `.devcontainer` includes a configuration for consistent local development. Just open the folder in VS Code and choose `Reopen in Container` when prompted.
You can visit [this guide](https://code.visualstudio.com/docs/devcontainers/containers) to learn more about Dev Containers.

#### ⚠️ Devcontainer Runtime Note

Before running npm run build or npm run dev inside the container, make sure your Node.js and npm versions are properly installed and accessible:

```bash
node --version
npm --version
```

If you encounter an error like this:

```bash
$ npm --version
node:internal/modules/cjs/loader:1251
  throw err;
  ^

Error: Cannot find module '/root/.vscode-server/data/User/workspaceStorage/ecbd587727c66e87727639745fae6f85/ms-vscode.js-debug/bootloader.js'
Require stack:
- internal/preload
    at Module._resolveFilename (node:internal/modules/cjs/loader:1248:15)
    at Module._load (node:internal/modules/cjs/loader:1074:27)
    at TracingChannel.traceSync (node:diagnostics_channel:315:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:217:24)
    at Module.require (node:internal/modules/cjs/loader:1339:12)
    at Module._preloadModules (node:internal/modules/cjs/loader:1826:12)
    at loadPreloadModules (node:internal/process/pre_execution:730:5)
    at setupUserModules (node:internal/process/pre_execution:205:5)
    at prepareExecution (node:internal/process/pre_execution:158:5)
    at prepareMainThreadExecution (node:internal/process/pre_execution:53:10) {
  code: 'MODULE_NOT_FOUND',
  requireStack: [ 'internal/preload' ]
}

Node.js v22.8.0
```

This is a known issue related to VS Code’s remote debugger inside Dev Containers. You can find the solution and workaround here:
https://github.com/devcontainers/images/issues/1189#issuecomment-3331446765

### 🐋 Docker Setup

This boilerplate includes Docker support for both development and production environments. Instead of using a single `docker-compose.yml`, the project provides separate Dockerfiles for each service including the API and background workers to give you more control and flexibility

If you prefer, you can create your own `docker-compose.yml` file and configure it as per your deployment needs.

📦 Available Dockerfiles

| Service  | Development                                                                                                         | Production                                                                                                            |
| -------- | ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| API      | [Dockerfile.api.dev](https://github.com/KishorNaik/expressjs_tsoa_boilerplate/blob/main/Dockerfile.api.dev)         | [Dockerfile.api.prod](https://github.com/KishorNaik/expressjs_tsoa_boilerplate/blob/main/Dockerfile.api.prod)         |
| BullMq   | [Dockerfile.bullMq.dev](https://github.com/KishorNaik/expressjs_tsoa_boilerplate/blob/main/Dockerfile.bullMq.dev)   | [Dockerfile.bullMq.prod](https://github.com/KishorNaik/expressjs_tsoa_boilerplate/blob/main/Dockerfile.bullMq.prod)   |
| Cron Job | [Dockerfile.cronJob.dev](https://github.com/KishorNaik/expressjs_tsoa_boilerplate/blob/main/Dockerfile.cronJob.dev) | [Dockerfile.cronJob.prod](https://github.com/KishorNaik/expressjs_tsoa_boilerplate/blob/main/Dockerfile.cronJob.prod) |

📝 Notes:

- BullMQ, Apache Kafka, RabbitMq and CronJob workers are script-based and do not expose any ports. They run as background processes.
- The API and each worker are intended to be deployed as separate services for scalability and isolation.
- Dockerfiles for Kafka worker and RabbitMQ worker are not included, but you can refer to the BullMQ worker Dockerfile as a template for creating them.

#### 🚀 Build & Run Commands

🔧 API Server

**Development**:

```bash
docker build -f Dockerfile.api.dev -t api-dev .
docker run -p 3000:3000 --env-file .env api-dev
```

**Production**:

```bash
docker build -f Dockerfile.api.prod -t api-prod .
docker run -p 3000:3000 --env-file .env api-prod
```

🧵 BullMQ Worker

**Development**:

```bash
docker build -f Dockerfile.bullMq.dev -t bullmq-dev .
docker run --env-file .env bullmq-dev
```

**Production**:

```bash
docker build -f Dockerfile.bullMq.prod -t bullmq-prod .
docker run --env-file .env bullmq-prod
```

⏰ Cron Job Worker

**Development**:

```bash
docker build -f Dockerfile.cronJob.dev -t cronjob-dev .
docker run --env-file .env cronjob-dev
```

**Production**:

```bash
docker build -f Dockerfile.cronJob.prod -t cronjob-prod .
docker run --env-file .env cronjob-prod
```

### 🔁 PM2 Process Manager

This boilerplate uses PM2 as the default process manager for running both the API and background workers in containerized environments. PM2 ensures reliable process management, automatic restarts, and clean logging especially useful in production.

#### 📂 Configuration

PM2 setup is already defined in the project. If you’d like to customize process names, environment variables, or script paths, you can modify the config file here:
👉 https://github.com/KishorNaik/expressjs_tsoa_boilerplate/blob/main/ecosystem.config.js

#### 🐋 Docker Integration

All Dockerfiles — for the API and workers — are configured to use PM2 runtime internally. This means:

- Each service runs as a managed PM2 process inside its container
- Logs and lifecycle events are handled automatically
- You don’t need to manually invoke pm2 start — it’s baked into the Docker entrypoint

#### 🖥️ Local Development Note

For local development, the API and workers run using standard npm scripts. PM2 is not used by default. However, if you prefer to run services locally using PM2, we’ve provided dedicated scripts for that in the `Available Scripts` section of the documentation.

### 🐶 Husky Git Hooks

This boilerplate includes Husky to automate Git hook setup and enforce code quality before commits. It helps catch issues early during the commit lifecycle.

#### ⚙️ Setup

To initialize Husky and configure the hooks, run

```bash
npm run prepare
```

This will activate the predefined Git hooks.

#### 🛠️ Customizing Hooks

If you’d like to modify the behavior of the pre-commit hook (e.g., add tests, change linting rules), you can edit the script directly here:
👉 https://github.com/KishorNaik/expressjs_tsoa_boilerplate/blob/main/.husky/pre-commit

### 🧹 Code Formatting & Linting

This boilerplate comes pre-configured with Prettier and ESLint to ensure consistent code style and catch common issues early.
#### ✨ Prettier

Prettier handles automatic code formatting across the project. It’s already integrated into the build pipeline and runs automatically when you execute:
```bash
npm run build:tsc
```
To manually format your code:
```bash
npm run prettier
```
You can customize formatting rules by editing the config file:
👉: https://github.com/KishorNaik/expressjs_tsoa_boilerplate/blob/main/.prettierrc

#### 🔍 ESLint
ESLint is used to statically analyze your TypeScript code and enforce best practices.
To run lint checks:
```bash
npm run lint

```
You can modify linting rules by editing:
👉 : https://github.com/KishorNaik/expressjs_tsoa_boilerplate/blob/main/.eslintrc

#### 📌 Note:
Keeping your codebase clean and consistent is part of the developer experience philosophy behind this boilerplate. These tools are already wired in — just run and go.

***

## 📜 Available Scripts

This boilerplate comes with a rich set of npm scripts to streamline development, testing, debugging, and deployment. Whether you're running locally with nodemon or managing services with PM2, these commands are designed to support both development and production workflows.

#### 🧪 Development & Load Testing

| Script Name                  | Summary                                                                                           |
| :--------------------------- | :------------------------------------------------------------------------------------------------ |
| **start:dev-api-autocannon** | Builds the application and starts the development API with autocannon for load testing using PM2. |
| **start:dev-autocannon**     | Runs autocannon for load testing against the development environment.                             |
| **start:dev-api**            | Builds the application and starts the development API using PM2.                                  |
| **start:dev-bullmq**         | Builds the application and starts the BullMQ worker for the development environment using PM2.    |
| **start:dev-cron**           | Builds the application and starts the cron worker for the development environment using PM2.      |
| **start:dev-rabbitmq**       | Builds the application and starts the RabbitMQ worker for the development environment using PM2.  |
| **start:dev-kafka**          | Builds the application and starts the Kafka worker for the development environment using PM2.     |
| **start:dev-pusher**         | Builds the application and starts the Pusher worker for the development environment using PM2.    |

#### 🚀 Production

| Script Name             | Summary                                                                                         |
| :---------------------- | :---------------------------------------------------------------------------------------------- |
| **start:prod-api**      | Builds the application and starts the production API using PM2.                                 |
| **start:prod-bullmq**   | Builds the application and starts the BullMQ worker for the production environment using PM2.   |
| **start:prod-cron**     | Builds the application and starts the cron worker for the production environment using PM2.     |
| **start:prod-rabbitmq** | Builds the application and starts the RabbitMQ worker for the production environment using PM2. |
| **start:prod-kafka**    | Builds the application and starts the Kafka worker for the production environment using PM2.    |
| **start:prod-pusher**   | Builds the application and starts the Pusher worker for the production environment using PM2.   |

#### 🔁 PM2 Management

| Script Name         | Summary                                                                                 |
| :------------------ | :-------------------------------------------------------------------------------------- |
| **pm2:stop:all**    | Stops and deletes all running processes managed by PM2.                                 |
| **pm2:restart:all** | Restarts all processes managed by PM2.                                                  |
| **pm2:logs**        | Displays logs from all PM2-managed processes.                                           |
| **pm2:save**        | Saves the current list of running processes to be resurrected on reboot.                |
| **pm2:monitor**     | Opens the PM2 monitoring dashboard in the terminal.                                     |
| **pm2:startup**     | Generates a startup script to automatically start PM2 and its processes on server boot. |

#### 📦 Build & Compile

| Script Name              | Summary                                                                                                    |
| :----------------------- | :--------------------------------------------------------------------------------------------------------- |
| **tsoa:spec-and-routes** | Generates OpenAPI (Swagger) specifications and TSOA routes.                                                |
| **build**                | Cleans the output directory, generates TSOA spec and routes, and then compiles the TypeScript source code. |
| **build:dev**            | Cleans the output directory, compiles TypeScript, and then transpiles with SWC for development.            |
| **build:tsc**            | Formats the code, generates TSOA spec and routes, and then compiles the TypeScript source code.            |

#### 🖥️ Local Development

| Script Name      | Summary                                                                                 |
| :--------------- | :-------------------------------------------------------------------------------------- |
| **dev**          | Starts the API in development mode with nodemon for automatic restarts on file changes. |
| **dev:api**      | An alias for dev, starts the API in development mode with nodemon.                      |
| **dev:cron**     | Starts the cron job worker in development mode.                                         |
| **dev:bullmq**   | Starts the BullMQ worker in development mode.                                           |
| **dev:rabbitmq** | Starts the RabbitMQ worker in development mode.                                         |
| **dev:kafka**    | Starts the Kafka worker in development mode.                                            |
| **dev:pusher**   | Starts the Pusher worker in development mode.                                           |

#### 🐞 Debugging

| Script Name           | Summary                                                                              |
| :-------------------- | :----------------------------------------------------------------------------------- |
| **debug:api**         | Starts the API in debug mode, allowing a debugger to be attached.                    |
| **debug:cron**        | Starts the cron job worker in debug mode.                                            |
| **debug:bullmq**      | Starts the BullMQ worker in debug mode.                                              |
| **debug:rabbitmq**    | Starts the RabbitMQ worker in debug mode.                                            |
| **debug:kafka**       | Starts the Kafka worker in debug mode.                                               |
| **debug:pusher**      | Starts the Pusher worker in debug mode.                                              |
| **debug:all-workers** | Runs all workers (cron, bullmq, rabbitmq, kafka, pusher) concurrently in debug mode. |

#### ✅ Testing & Linting

| Script Name  | Summary                                                                                    |
| :----------- | :----------------------------------------------------------------------------------------- |
| **test** | Execute the test cases.                                                    |
| **lint**     | Lints all .ts files in the src directory using ESLint.                                     |
| **lint:fix** | Lints and automatically fixes all fixable ESLint issues.                                   |
| **prettier** | Formats all files in the project with Prettier according to the .prettierrc configuration. |

#### 🧹 Maintenance & Utilities

| Script Name                   | Summary                                                                    |
| :---------------------------- | :------------------------------------------------------------------------- |
| **clean**                     | Deletes the dist directory to remove all compiled files.                   |
| **prepare**                   | A lifecycle script that runs husky to set up Git hooks.                    |
| **npm:outdated**              | Shows a list of all outdated npm packages.                                 |
| **npm:latest-package-update** | Updates all dependencies to their latest versions using npm-check-updates. |
| **trpc:type**                 | Generates a TypeScript declaration file for the tRPC App Router.           |

## 🗂 Code Structure

### Base Structure

```markdown
├───.dockerignore
├───.editorconfig
├───.eslintignore
├───.eslintrc
├───.gitignore
├───.lintstagedrc.json
├───.prettierrc
├───.swcrc
├───docker.Command.txt
├───Dockerfile.api.dev
├───Dockerfile.api.prod
├───Dockerfile.bullMq.dev
├───Dockerfile.bullMq.prod
├───Dockerfile.cronJob.dev
├───Dockerfile.cronJob.prod
├───ecosystem.config.js
├───LICENSE
├───Makefile
├───nginx.conf
├───nodemon.json
├───package-lock.json
├───package.json
├───README.md
├───RunTest.sh
├───tsconfig.json
├───tsoa_base.code-workspace
├───tsoa.json
├───.devcontainer\
│   ├───devcontainer.json
│   └───Dockerfile
├───.git\
├───.husky\
│   ├───pre-commit
│   └───_
├───.qodo\
├───.vscode\
│   ├───launch.json
│   └───settings.json
├───dist\
├───logs\
├───node_modules\
└───src\
    ├───app.ts
    ├───server.ts
    ├───config\
    │   ├───db\
    │   │   └───index.ts
    │   ├───env\
    │   │   └───index.ts
    │   ├───trpc\
    │   │   └───index.ts
    │   ├───tsoaBuild\
    │   │   ├───routes.ts
    │   │   └───swagger.json
    │   └───worker\
    │       └───index.ts
    ├───middlewares\
    │   ├───exception\
    │   │   └───index.ts
    │   ├───loggers\
    │   │   ├───http\
    │   │   │   └───index.ts
    │   │   └───trace\
    │   │       └───index.ts
    │   ├───security\
    │   │   ├───auth\
    │   │   │   ├───hmac\
    │   │   │   │   └───index.ts
    │   │   │   └───jwt\
    │   │   │       └───index.ts
    │   │   ├───ipTracker\
    │   │   │   └───index.ts
    │   │   ├───rateLimit\
    │   │   │   └───index.ts
    │   │   ├───throttling\
    │   │   │   └───index.ts
    │   │   └───validations\
    │   │       └───index.ts
    │   └───tooBusy\
    │       └───index.ts
    ├───modules\
    │   └───...
    ├───shared\
    │   └───utils\
    │       └───helpers\
    │           ├───bullMq\
    │           │   └───index.ts
    │           ├───cronJob\
    │           │   └───index.ts
    │           ├───eventDispatcher\
    │           │   └───index.ts
    │           ├───kafka\
    │           │   └───index.ts
    │           ├───loggers\
    │           │   └───index.ts
    │           ├───medaitR\
    │           │   └───index.ts
    │           ├───pusher\
    │           │   └───index.ts
    │           ├───rabbitmq\
    │           │   └───index.ts
    │           ├───traceId\
    │           │   └───index.ts
    │           └───tsoa\
    │               └───index.ts
    ├───workers\
    │   ├───bullMq\
    │   │   └───index.ts
    │   ├───cronJob\
    │   │   └───index.ts
    │   ├───eventDispatcher\
    │   │   └───index.ts
    │   ├───kafka\
    │   │   └───index.ts
    │   ├───pusher\
    │   │   └───index.ts
    │   └───rabbitMq\
    │       └───index.ts
    └───zone\
        ├───test\
        │   └───index.test.ts
        └───tools\
            ├───aes\
            │   └───index.ts
            └───autocannon\
                └───index.ts
```
### 🚀 Application Entry Points
```markdown
└───src\
    ├───app.ts
    ├───server.ts
```
At the root of the  directory, you’ll find two key files that bootstrap the application:
#### 🧩 app.ts
This file is responsible for assembling the Express application. It handles:
- Registering built-in middlewares (e.g., CORS, body parsing, logging)
- Setting up Swagger/OpenAPI documentation via TSOA
- Mounting routes
- Applying global error-handling middleware
- Applies server-level configurations like timeouts and keep-alive setting
- Applying port and listen.

Think of `app.ts` as the application builder — it wires together all the core pieces before the server starts.

#### 🏁 server.ts
This is the entry point of the application. It:
- Imports the configured app from `app.ts`
- Starts the HTTP server

📌 Note: This separation keeps your app logic clean and testable, while isolating server concerns like port binding and lifecycle management.

### ⚙️ Configuration Directory

```markdown
└───src\
    ├───config\
    │   ├───db\
    │   │   └───index.ts
    │   ├───env\
    │   │   └───index.ts
    │   ├───trpc\
    │   │   └───index.ts
    │   ├───tsoaBuild\
    │   │   ├───routes.ts
    │   │   └───swagger.json
    │   └───worker\
    │       └───index.ts
```
The `src\config\` folder centralizes all configuration-related logic and constants. It’s designed to keep environment setup, service bindings, and build artifacts cleanly separated from business logic.

#### 📦 Folder Breakdown
- `env/`
Centralizes  variable access and constants. This is where you define and export environment-specific values used across the app.

- `db/`
Contains database configuration — connection setup, ORM bindings, and any DB-specific constants.

- `trpc/`
Handles tRPC configuration and router bindings if you're using tRPC alongside TSOA.

- `tsoaBuild/`
stores auto-generated TSOA artifacts.
  - `routes.ts` Generated route bindings
  - `swagger.json` OpenAPI spec used for Swagger UI
- `worker/`
Registers the plugins for the workers.

📌 Note: This folder is meant for configuration only — avoid placing business logic or feature code here. Keep it clean, declarative, and environment-aware.

### 🧩 Middleware Structure
```markdown
└───src\
    ├───middlewares\
    │   ├───exception\
    │   │   └───index.ts
    │   ├───loggers\
    │   │   ├───http\
    │   │   │   └───index.ts
    │   │   └───trace\
    │   │       └───index.ts
    │   ├───security\
    │   │   ├───auth\
    │   │   │   ├───hmac\
    │   │   │   │   └───index.ts
    │   │   │   └───jwt\
    │   │   │       └───index.ts
    │   │   ├───ipTracker\
    │   │   │   └───index.ts
    │   │   ├───rateLimit\
    │   │   │   └───index.ts
    │   │   ├───throttling\
    │   │   │   └───index.ts
    │   │   └───validations\
    │   │       └───index.ts
    │   └───tooBusy\
    │       └───index.ts
```
The `src\middlewares\` directory is dedicated to housing all middleware logic used across the application. It’s organized by category to keep things modular and easy to extend.

Each subfolder represents a logical grouping — such as logging, security, or exception handling — and contains one or more middleware implementations.

📌 Note: Built-in middlewares are already implemented and wired into the app. If you want to create your own custom middleware, this is the place to do it. Follow the existing folder structure and always use  as the entry file.

### 🛠️ Shared Utility
```markdown
└───src\
    ├───shared\
    │   └───utils\
    │       └───helpers\
    │           ├───bullMq\
    │           │   └───index.ts
    │           ├───cronJob\
    │           │   └───index.ts
    │           ├───eventDispatcher\
    │           │   └───index.ts
    │           ├───kafka\
    │           │   └───index.ts
    │           ├───loggers\
    │           │   └───index.ts
    │           ├───medaitR\
    │           │   └───index.ts
    │           ├───pusher\
    │           │   └───index.ts
    │           ├───rabbitmq\
    │           │   └───index.ts
    │           ├───traceId\
    │           │   └───index.ts
    │           └───tsoa\
    │               └───index.ts
```
The `src\shared\utils\`  directory is dedicated to reusable utility functions that support various parts of the application. Each helper is scoped by concern — such as messaging, logging, or tracing — and organized into its own folder.

📌 Note:
- Each helper must live in its own folder, not as a standalone file.
- The implementation should always reside in an index.ts file inside that folder.
- This convention ensures consistency, clean imports, and easy discoverability.

If you’re adding a new helper, follow the same structure and naming pattern to keep the codebase modular and maintainable.

### ⚙️ Worker Runtime
```markdown
└───src\
    ├───workers\
    │   ├───bullMq\
    │   │   └───index.ts
    │   ├───cronJob\
    │   │   └───index.ts
    │   ├───eventDispatcher\
    │   │   └───index.ts
    │   ├───kafka\
    │   │   └───index.ts
    │   ├───pusher\
    │   │   └───index.ts
    │   └───rabbitMq\
    │       └───index.ts
```
The `src/workers/` directory contains the runtime entry points for all background workers. These workers are designed to run independently and are not bound to the API execution lifecycle.
Each worker is deployed as a separate Node.js service, allowing for horizontal scaling, isolated failure handling, and optimized resource allocation.

📌 Note:
- Workers are executed via dedicated npm scripts.
- Do not place business logic directly in this folder — use domain modules for that.
- Each worker runs in its own process and can be deployed separately.

### 🧪 Tool Testing Zone
```markdown
└───src\
    └───zone\
        ├───test\
        │   └───index.test.ts
        └───tools\
            ├───aes\
            │   └───index.ts
            └───autocannon\
                └───index.ts
```

The `src/zone/` directory is reserved for isolated tool testing and experimentation. It’s a sandboxed space where you can validate utilities, benchmark performance, or run standalone test cases without affecting core modules.

📌 Note: This section is meant for internal validation and experimentation. It’s not tied to domain modules or production logic.


### Overview of Modules Structure

```markdown
modules/
  ├───app.Module.ts
  ├───bullMq.Worker.Module.ts
  ├───cronJon.Worker.Module.ts
  ├───eventDispatcher.Worker.Module.ts
  ├───kafka.Worker.Module.ts
  ├───pusher.Worker.Module.ts
  ├───rabbitMq.Worker.Module.ts
  ├───organizations/
  │   ├───org.Module.ts
  │   ├───apps/
  │   │   └───features/
  │   │       └───v1/
  │   │           ├───createOrg/
  │   │           │   ├───contract/
  │   │           │   │   └───index.ts
  │   │           │   ├───endpoint/
  │   │           │   │   └───index.ts
  │   │           │   └───services/
  │   │           │       └───db/
  │   │           │           └───index.ts
  │   │           └───getOrgById/
  │   │               ├───contract/
  │   │               │   └───index.ts
  │   │               ├───endpoint/
  │   │               │   └───index.ts
  │   │               └───services/
  │   │                   └───db/
  │   │                       └───index.ts
  │   └───tests/
  │       └───integrations/
  │           └───features/
  │               └───v1/
  │                   ├───createOrg/
  │                   │   └───index.test.ts
  │                   └───getOrgById/
  │                       └───index.test.ts
  ├───shared/
  │   └───users/
  │       └───services/
  │           ├───hashPassword/
  │           │   └───index.ts
  │           ├───jwt/
  │           │   └───index.ts
  │           └───jwtTokenProvider/
  │               └───index.ts
  └───users/
      ├───users.Module.ts
      ├───apps/
      │   └───features/
      │       └───v1/
      │           ├───createUser/
      │           │   ├───contract/
      │           │   │   └───index.ts
      │           │   ├───endpoint/
      │           │   │   └───index.ts
      │           │   └───services/
      │           │       └───db/
      │           │           └───index.ts
      │           ├───getUserById/
      │           │   ├───contract/
      │           │   │   └───index.ts
      │           │   ├───endpoint/
      │           │   │   └───index.ts
      │           │   └───services/
      │           │       └───db/
      │           │           └───index.ts
      │           ├───getUsers/
      │           │   ├───contracts/
      │           │   │   └───index.ts
      │           │   ├───endpoint/
      │           │   │   └───index.ts
      │           │   └───services/
      │           │       └───db/
      │           │           └───index.ts
      │           ├───removeUser/
      │           │   ├───contract/
      │           │   │   └───index.ts
      │           │   ├───endpoint/
      │           │   │   └───index.ts
      │           │   └───services/
      │           │       └───db/
      │           │           └───index.ts
      │           ├───updateUser/
      │           │   ├───contract/
      │           │   │   └───index.ts
      │           │   ├───endpoint/
      │           │   │   └───index.ts
      │           │   └───services/
      │           │       └───db/
      │           │           └───index.ts
      │           └───updateUserPassword/
      │               ├───command/
      │               │   └───index.ts
      │               ├───contract/
      │               │   └───index.ts
      │               ├───endpoint/
      │               │   └───index.ts
      │               └───services/
      │                   └───db/
      │                       └───index.ts
      ├───shared/
      │   └───services/
      │       └───hashPassword/
      │           └───index.ts
      └───tests/
          └───integrations/
              └───features/
                  └───v1/
                      ├───createUser/
                      │   └───index.test.ts
                      ├───getUserById/
                      │   └───index.test.ts
                      ├───getUsers/
                      │   └───index.test.ts
                      ├───removeUser/
                      │   └───index.test.ts
                      ├───updateUser/
                      │   └───index.test.ts
                      └───updateUserPassword/
                          └───index.test.ts
```
### ⚙️ Worker Module Registration
```markdown
modules/
  ├───app.Module.ts
  ├───bullMq.Worker.Module.ts
  ├───cronJon.Worker.Module.ts
  ├───eventDispatcher.Worker.Module.ts
  ├───kafka.Worker.Module.ts
  ├───pusher.Worker.Module.ts
  ├───rabbitMq.Worker.Module.ts
```
This boilerplate supports multiple background processing strategies — including BullMQ, Cron Jobs, Kafka, RabbitMQ, Pusher, and in-memory event dispatchers. Each worker type is registered modularly to keep the system scalable and maintainable.

Each of these worker modules is responsible for:
- Registering worker handlers from domain modules (e.g.,`users.Module.ts`,`organization.Module.ts` )
- Bootstrapping the worker runtime (via PM2 or direct execution)
- Isolating background logic for better scalability and deployment control

#### 🧭 How It Works
- Every domain module (like users.Module.ts) can expose one or more worker handlers.
- These handlers are imported and registered inside the corresponding worker module (e.g., bullMq.Worker.Module.ts).
- This design allows each worker to run independently — whether in Docker, PM2, or serverless environments.

📌 Note: This modular registration pattern ensures that each worker service can be deployed, scaled, and monitored separately — without coupling it to the main API runtime.




### 🔄 Domain-Scoped Shared Services Code Structure

```markdown
modules/
  ├───shared/
  │   └───users/
  │       └───services/
  │           ├───hashPassword/
  │           │   └───index.ts
  │           ├───jwt/
  │           │   └───index.ts
  │           └───jwtTokenProvider/
  │               └───index.ts
```
In this boilerplate, `shared` services are organized under the `/modules/shared` directory — but with a twist: they’re scoped by domain.
This means that if a service is reused across multiple modules, it should still live within a domain-specific context.

#### 🧭 Why Domain-Scoped?
- Keeps shared logic bounded to its domain, avoiding global sprawl
- Encourages modular reuse without breaking encapsulation
- Makes it easier to reason about dependencies and service ownership

In the example above, `users` is the domain, and all shared services related to user authentication or security (like hashing, JWT, token providers) are grouped under `modules/shared/users/services`.

📌 Note: This structure is intentional. Even shared logic should respect domain boundaries to maintain clarity and modularity.


### 🧭 Domain (Module) Code Structure
```markdown
users/
├───users.Module.ts
├───apps/
│   └───features/
│       └───v1/
│           ├───createUser/
│           │   ├───contract/
│           │   │   └───index.ts
│           │   ├───endpoint/
│           │   │   └───index.ts
│           │   └───services/
│           │       └───db/
│           │           └───index.ts
├───shared/
│   └───services/
│       └───hashPassword/
│           └───index.ts
│───tests/
    └───integrations/
        └───features/
            └───v1/
                ├───createUser/
                │   └───index.test.ts
```

This boilerplate follows a modular, versioned, vertical slice architecture. Each module encapsulates its own features, services, and tests — making the system scalable and easy to reason about.


#### 📦 Folder Breakdown
- `users/`
Represents a module. Each module encapsulates its own features, services, and tests.
- `user.module.ts`
Register workers for the module.
- `apps/features/v1/`
Contains versioned features. You can create multiple versions (v1, v2, etc.) to support API evolution.
- `createUser/`
A feature folder. Every feature should be a folder — not a file — to maintain consistency and extensibility.
  - `contract/`
  Contains request and response DTOs with `class-validator` decorators for validation.
  - `endpoint/`
  Defines the controller or route handler. Services are injected using **Dependency Injection** `(typedi)`.
  - `service/`
  Contains business logic. Each service should follow the **Single Responsibility Principle** and live in its own folder.
- `shared/`
Contains reusable logic within the module’s bounded context. For example,  is a shared utility used across features.
- `tests/`
Integration tests are organized by module and feature version to ensure clarity and traceability.

#### ⚠️ Naming Convention Note
- Every feature or service must be a `folder`, not a standalone file.
- The implementation must reside in an `index.ts` file inside that folder.
- This convention ensures consistency, discoverability, and clean imports across the codebase.

#### 📘 TSOA Routing & Swagger Note
TSOA builds routes and Swagger documentation based on your folder and file structure. If you change the layout, you must update the `tsoa.json` configuration accordingly:
```json
{
  "entryFile": "src/server.ts",
  "noImplicitAdditionalProperties": "throw-on-extras",
  "controllerPathGlobs": ["src/modules/**/apps/features/**/endpoint/index.ts"],
  "spec": {
    "outputDirectory": "src/config/tsoaBuild",
    "specVersion": 3
  },
  "routes": {
    "routesDir": "src/config/tsoaBuild"
  }
}
```
You can modify tsoa configuration by editing:
👉 : https://github.com/KishorNaik/expressjs_tsoa_boilerplate/blob/main/tsoa.json

📌 Important: Keep your folder structure aligned with `controllerPathGlobs` to ensure TSOA can generate routes and Swagger specs correctly.

#### 🧪 Testing
To run all integration tests across modules and features, use:
```bash
npm run test
```
This command executes every test script defined within the modular structure — including feature-wise tests under `/src/modules/**/tests/integrations/features/v1/**`. It ensures that all domain logic and endpoints are validated in one go.

📌 Note: Tests are organized by module and versioned feature folders to maintain clarity, traceability, and scalability.

#### 📦 Versioning Strategy
Features are grouped under `v1`,`v2` , etc., allowing you to evolve APIs without breaking existing consumers.

📌 Note: Always create a new version folder when introducing breaking changes to a feature.
***

## 🚀 Production Deployment Guide

This guide provides step-by-step instructions for deploying the application in a production environment using Docker and PM2.

### 📌 Prerequisites
- 🐳 Docker on your server
- 🧑‍💻 Node.js and npm on your local machine
- 💻 Access to a terminal or command prompt

### Build Docker Image
This project uses multi-stage Docker builds to create lean, production-ready images.

#### 🧱 API Image
```bash
docker build -f Dockerfile.api.prod -t api-prod .
```

#### 🧵 BullMQ Worker Image
```bash
docker build -f Dockerfile.bullMq.prod -t bullmq-worker-prod .
```

#### ⏰ Cron Job Worker Image
```bash
docker build -f Dockerfile.cronJob.prod -t cron-worker-prod .
```

### Run Docker Containers

#### 🌐 API Container
```bash
docker run -d -p 8080:8080 --name api-container api-prod
```
This starts the API container in detached mode and maps port `8080` from container to host.

#### 🧵 BullMQ Worker Container
```bash
docker run -d --name bullmq-worker-container bullmq-worker-prod
```

#### ⏰ Cron Job Worker Container
```bash
docker run -d --name cron-worker-container cron-worker-prod
```

⚠️ Each worker runs independently and is not tied to the API lifecycle. You can deploy them on separate nodes for scalability.

### Using PM2 Without Docker
If you prefer to run the application directly on your server using PM2, follow these steps:

#### 🧰 Prerequisites
- Node.js and npm installed on your server
- PM2 installed globally:
```bash
npm install -g pm2
```

#### 🛠️ Steps
- Install dependencies:
```bash
npm install
```

- Build the application:
```bash
npm run build
```

- Start services using PM2:
  - 🔧 API:
  ```bash
  pm2 start ecosystem.config.js --only prod
  ```
  - 🧵 BullMQ Worker:
  ```bash
  pm2 start ecosystem.config.js --only bullmq-worker
  ```
  - ⏰ Cron Job Worker:
  ```bash
  pm2 start ecosystem.config.js --only cron-worker
  ```

### Managing the Application with PM2

Here are some useful PM2 commands:

| Command | Description |
| :--- | :--- |
| `pm2 list` | List all running processes |
| `pm2 logs` | Monitor logs |
| `pm2 stop <process-name>` | Stop a process |
| `pm2 restart <process-name>` | Restart a process |
| `pm2 delete <process-name>` | Delete a process |
| `pm2 save` | Save current process list for reboot |
| `pm2 startup` | Generate startup script for auto-launch |
| `pm2 monit` | Monitor the process |

For more information on PM2, refer to the [official PM2 documentation](https://pm2.keymetrics.io/docs/usage/quick-start/).

#### 📌 Note:
You can follow the same Docker build and run pattern for Kafka and RabbitMQ workers as shown for BullMQ.
Just create corresponding Dockerfiles (e.g.,`Dockerfile.kafka.prod` ,`Dockerfile.rabbitMq.prod` ) and use the BullMQ setup as a reference for structure, PM2 integration, and runtime behavior.

***

## 📄 License & Attribution
This project is licensed under the Apache-2.0 License.
For details, refer to the LICENSE, NOTICE, and CONTRIBUTORS files.

📌 Contributions are welcome! Please review the license terms before submitting pull requests or using this boilerplate in production.

***

## 📘 Note:
For extended code-level documentation and feature-specific guides, please refer to the GitHub Wiki.

👉 :https://github.com/KishorNaik/expressjs_tsoa_boilerplate/wiki


