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
