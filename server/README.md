
## Prerequisites

Before you begin, ensure you have the following installed on your system:
```
* Node.js (>= 16.x)
* npm (>= 6.x)
* TypeScript (>= 4.x)
```

## Installation

### Step 1: Initial Setup

1. Clone the repository and navigate to the project directory:
   ```bash
    git clone https://github.com/your-username/pokedox.git
    cd pokedox/server
    ```

2. Remove any existing `package-lock.json` file and install dependencies:
    ```bash
    rm -rf package-lock.json
    npm install
    ```

### Step 2: Set Up Prisma

1. Initialize Prisma and configure the database:
    ```bash
    npx prisma generate
    npx prisma migrate dev --name init
    ```

2. Seed the database with initial data:
    ```bash
    npx ts-node prisma/seed.ts
    ```

### Step 3: Start the tRPC Server

1. Start the tRPC server:
    ```bash
    npm run dev
    ```

    The server should now be running at `http://localhost:4000`.