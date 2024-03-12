# Development

Steps to launch the application in development

1. Launch the database

```
docker compose up -d
```

2. Rename the file .env.template to .env

3. Replace environment variables

4. Run the command ``` npm install ```

5. Run the command ``` npm run dev ```

6. Run the commands ``` npx prisma migrate dev ``` and ``` npx prisma generate ```

7. Execute the SEED to [create the local database](localhost:3000/api/seed)

# Prisma commands

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```
