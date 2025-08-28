FROM node:20-alpine

WORKDIR /app

RUN corepack enable

COPY . .

RUN pnpm install

EXPOSE 3000 5173

ENV VITE_API_URL=http://localhost:3000

CMD ["pnpm", "dev"]

