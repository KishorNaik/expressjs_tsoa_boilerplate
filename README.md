# ExpressJs Boilerplate Powered by TSOA

## 🚀 Overview

This boilerplate is designed to help you hit the ground running when building RESTful APIs using Express.js, TypeScript, and TSOA. It’s structured for clarity, scalability, and ease of onboarding, especially for teams working in fast-paced startup environments.

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
  - **Kafka** for distributed event streaming
  - **RabbitMQ** – A popular message broker for decoupled services
  - **Kafka** – A distributed streaming platform for high-throughput event pipelines
  - **Pusher** – A real-time messaging service for push notifications and live updates
  - **In-memory Event Dispatcher** for lightweight pub-sub flows
- Developer-friendly Tooling: The boilerplate is configured with a set of tools to improve the developer experience, including:
  - **SWC** – A super-fast JavaScript/TypeScript compiler for blazing-fast builds
  - **ESLint** – A pluggable linter for catching bugs and enforcing code style
  - **Prettier** – An opinionated code formatter for clean, readable code
  - **Husky** – Git hook support for pre-commit checks and automation
  - **PM2** – A production-grade process manager for Node.js apps
- **Devcontainer** support for consistent local development in VS Code
- **Docker** base images for both development and production environments, optimized for build speed and runtime performance
- The boilerplate integrates with a custom open-source **NPM utility packages** to simplify common tasks and enhance developer experience.


This isn’t just a code dump. It’s a thoughtfully crafted starting point for teams who care about velocity, safety, and developer experience.

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

| Packages      | Summary |
| ----------- | ----------- |
| [tsoa](https://github.com/lukeautry/tsoa)      | Type-safe routing and OpenAPI generation for Express.js using TypeScript decorators.       |
| [mediatr-ts](https://github.com/m4ss1m0g/mediatr-ts)   | Implements the mediator pattern for decoupled request handling using commands, queries, and handlers. (CQRS Pattern)       |
| [neverthrow](https://github.com/supermacro/neverthrow)   | Functional error-handling with typed `Result` objects — safer than throwing exceptions.|
| [typedi](https://github.com/typestack/typedi)   | Dependency injection container for TypeScript, enabling clean service registration and resolution.        |
| [linq](https://github.com/mihaifm/linq)   | LINQ-style query library for expressive data transformations in JavaScript/TypeScript.        |
| [typeORM](https://typeorm.io/)   | Feature-rich ORM for TypeScript with support for decorators, migrations, and multiple databases.        |
| [class-validator](https://github.com/typestack/class-validator)   | Declarative validation for TypeScript classes using decorators — perfect for DTOs and request schemas.        |

All of these are pre-integrated and exposed via `@kishornaik/utils` npm package, so you don’t need to install or wire them manually. Just import and go.
This package is fully open source and designed to empower developers with clean, reusable patterns; whether you're building a small service or scaling a platform.

## ⚙️ Installation & Setup
To get started with this boilerplate, follow the steps below to clone the repository and set up your development environment.

### 🔗 Clone the Repository
```bash
git clone https://github.com/KishorNaik/expressjs_tsoa_boilerplate.git
cd expressjs_tsoa_boilerplate
```

### 📁 Configure Environment Variables
Before running the project, create a  file in the root directory and populate it with the required environment variables. Here's a sample configuration:
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
npm run dev
```
Once the server starts, you’ll have access to several built-in endpoints for monitoring and documentation:
- Health Check → [http://localhost:3000/health]
Returns a simple status response to confirm the server is alive.
- API Info → [http://localhost:3000/info]
Provides metadata about the API — version, environment, and other useful details.
- Metrics → [http://localhost:3000/metrics]
Shows metrics information for the current application.
- Swagger Docs → [http://localhost:3000/api-docs]
  - Interactive API documentation generated via TSOA and OpenAPI.
  - ⚠️ Note: Swagger is only available in the development environment for security reasons.

These endpoints are part of the boilerplate’s built-in observability and documentation layer — no extra setup required.

### 🐳 Optional: Devcontainer Setup
If you're using VS Code with Dev Containers, this project `.devcontainer` includes a  configuration for consistent local development. Just open the folder in VS Code and choose `Reopen in Container` when prompted.
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
This boilerplate includes Docker support for both development and production environments. Instead of using a single docker-compose.yml, the project provides separate Dockerfiles for each service — including the API and background workers.
📦 Available Dockerfiles
|  |  |  |
|  | Dockerfile.api.dev | Dockerfile.api.prod |
|  | Dockerfile.bullMq.dev | Dockerfile.bullMq.prod |
|  | Dockerfile.cronJob.dev | Dockerfile.cronJob.prod |


📝 Note: BullMQ and CronJob workers are script-based and do not expose any ports. They run as background processes.


🚀 Build & Run Commands
🔧 API Server
Development:
docker build -f Dockerfile.api.dev -t api-dev .
docker run -p 3000:3000 --env-file .env api-dev


Production:
docker build -f Dockerfile.api.prod -t api-prod .
docker run -p 3000:3000 --env-file .env api-prod



🧵 BullMQ Worker
Development:
docker build -f Dockerfile.bullMq.dev -t bullmq-dev .
docker run --env-file .env bullmq-dev


Production:
docker build -f Dockerfile.bullMq.prod -t bullmq-prod .
docker run --env-file .env bullmq-prod



⏰ Cron Job Worker
Development:
docker build -f Dockerfile.cronJob.dev -t cronjob-dev .
docker run --env-file .env cronjob-dev


Production:
docker build -f Dockerfile.cronJob.prod -t cronjob-prod .
docker run --env-file .env cronjob-prod



Let me know when you're ready to move on to the Project Structure section — we can walk developers through the folder layout and how it supports vertical slice architecture.

### 🐋 Docker Setup
This boilerplate includes Docker support for both development and production environments. Instead of using a single `docker-compose.yml`, the project provides separate Dockerfiles for each service including the API and background workers to give you more control and flexibility

If you prefer, you can create your own `docker-compose.yml` file and configure it as per your deployment needs.

📦 Available Dockerfiles

| Service     | Development | Production |
| ----------- | ----------- | ----------- |
| API      | [Dockerfile.api.dev](https://github.com/KishorNaik/expressjs_tsoa_boilerplate/blob/main/Dockerfile.api.dev)       | [Dockerfile.api.prod](https://github.com/KishorNaik/expressjs_tsoa_boilerplate/blob/main/Dockerfile.api.prod)
| BullMq   | [Dockerfile.bullMq.dev](https://github.com/KishorNaik/expressjs_tsoa_boilerplate/blob/main/Dockerfile.bullMq.dev)        | [Dockerfile.bullMq.prod](https://github.com/KishorNaik/expressjs_tsoa_boilerplate/blob/main/Dockerfile.bullMq.prod) |
| Cron Job   | [Dockerfile.cronJob.dev](https://github.com/KishorNaik/expressjs_tsoa_boilerplate/blob/main/Dockerfile.cronJob.dev)        | [Dockerfile.cronJob.prod](https://github.com/KishorNaik/expressjs_tsoa_boilerplate/blob/main/Dockerfile.cronJob.prod) |

📝 Notes:
- BullMQ and CronJob workers are script-based and do not expose any ports. They run as background processes.
- The API and each worker are intended to be deployed as separate services for scalability and isolation.
- Dockerfiles for Kafka and RabbitMQ are not included, but you can refer to the BullMQ Dockerfile as a template for creating them.
