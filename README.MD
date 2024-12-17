# Setup Instructions

Follow these steps to set up and run the project:

1. **Install dependencies**:
    ```bash
    npm install
    ```

2. **Stop PostgreSQL service (if running locally)**:
    ```bash
    sudo systemctl stop postgresql
    ```

3. **Start the Docker containers**:
    ```bash
    docker-compose up -d
    ```

4. **Generate Prisma client**:
    ```bash
    npx prisma generate
    ```

5. **Run any additional Prisma migrations**:
    ```bash
    npx prisma migrate dev
    ```

6. **Open Prisma Studio to visualize your data**:
    ```bash
    npx prisma studio
    ```

7. **Seed the database**:
    ```bash
    npx prisma db seed
    ```

8. **Start the server**:
    ```bash
    node src/server.js
    ```

Your application should now be running!

## Postman Collection

You can find the Postman collection for the API in the root of the project. Import the `user_api.postman_collection.json` file into Postman to test the endpoints.

[Download Postman](https://www.postman.com/downloads/) if you haven't already.
