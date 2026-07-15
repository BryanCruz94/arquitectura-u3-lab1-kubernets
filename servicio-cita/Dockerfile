FROM oven/bun
WORKDIR /app

COPY package.json . 
COPY bun.lock .
# COPY .env .

RUN bun install

COPY . .

EXPOSE 3003

CMD ["bun", "index.ts"]