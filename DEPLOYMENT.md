# Production Deployment Guide

This guide provides step-by-step instructions for deploying the application in a production environment using Docker and PM2.

## Prerequisites

- Docker installed on your server.
- Node.js and npm installed on your local machine.
- Access to a terminal or command prompt.

## 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone <repository-url>
cd <repository-name>
```

## 2. Build Docker Images

This project uses a multi-stage Docker build to create lean production images.

### API Image

Build the API image:

```bash
docker build -f Dockerfile.api.prod -t api-prod .
```

### BullMQ Worker Image

Build the BullMQ worker image:

```bash
docker build -f Dockerfile.bullMq.prod -t bullmq-worker-prod .
```

### Cron Job Worker Image

Build the cron job worker image:

```bash
docker build -f Dockerfile.cronJob.prod -t cron-worker-prod .
```

## 3. Run Docker Containers

### API Container

Run the API container:

```bash
docker run -d -p 8080:8080 --name api-container api-prod
```

This will start the API container in detached mode and map port 8080 of the container to port 8080 on the host machine.

### BullMQ Worker Container

Run the BullMQ worker container:

```bash
docker run -d --name bullmq-worker-container bullmq-worker-prod
```

### Cron Job Worker Container

Run the cron job worker container:

```bash
docker run -d --name cron-worker-container cron-worker-prod
```

## 4. Using PM2 without Docker

If you prefer to run the application with PM2 directly on your server without Docker, follow these steps:

### Prerequisites

- Node.js and npm installed on your server.
- PM2 installed globally: `npm install -g pm2`

### Steps

1.  **Clone the repository** to your server as described in step 1.
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Build the application**:
    ```bash
    npm run build
    ```
4.  **Start the applications using PM2**:
    - **API**:
        ```bash
        pm2 start ecosystem.config.js --only prod
        ```
    - **BullMQ Worker**:
        ```bash
        pm2 start ecosystem.config.js --only bullmq-worker
        ```
    - **Cron Job Worker**:
        ```bash
        pm2 start ecosystem.config.js --only cron-worker
        ```

## 5. Managing the Application with PM2

Here are some useful PM2 commands:

| Command                      | Description                             |
| :--------------------------- | :-------------------------------------- |
| `pm2 list`                   | List all running processes              |
| `pm2 logs`                   | Monitor logs                            |
| `pm2 stop <process-name>`    | Stop a process                          |
| `pm2 restart <process-name>` | Restart a process                       |
| `pm2 delete <process-name>`  | Delete a process                        |
| `pm2 save`                   | Save current process list for reboot    |
| `pm2 startup`                | Generate startup script for auto-launch |
| `pm2 monit`                  | Monitor the process                     |

For more information on PM2, refer to the [official PM2 documentation](https://pm2.keymetrics.io/docs/usage/quick-start/).
