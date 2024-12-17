sudo systemctl stop postgresql

docker-compose up -d

npx prisma generate

npx prisma migrate dev --name init

npx prisma migrate dev

npx prisma studio

node src/server.js