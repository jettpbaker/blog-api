FROM node:20-slim

# install OpenSSL so Prisma can detect it
RUN apt-get update \
 && apt-get install -y openssl \
 && rm -rf /var/lib/apt/lists/*

# Enable Corepack (bundled) & activate pnpm
RUN corepack enable \
  && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy package files & lockfile
COPY package.json pnpm-lock.yaml ./

# Install deps (frozen lockfile ensures reproducible builds)
RUN pnpm install --frozen-lockfile

# Copy source & Prisma schema
COPY . .

# Generate Prisma client
RUN pnpm prisma generate

# Expose your app port
EXPOSE 3000

# Default command (replace "dev" with your start script if needed)
CMD ["pnpm", "run", "dev"]
