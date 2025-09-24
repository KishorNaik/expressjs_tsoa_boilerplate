# Use official Node.js image
FROM node:22.16.0-slim

# Install necessary system packages
# Install build-essential for native add-ons
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    git \
    build-essential \
    sudo \
    && rm -rf /var/lib/apt/lists/*

# Keep the container running for development
CMD ["sleep", "infinity"]
