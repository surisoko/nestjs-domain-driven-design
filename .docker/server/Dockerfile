FROM node:21

RUN mkdir /var/current

WORKDIR /var/current

RUN npm install -g pnpm@9.4.0

COPY . ./

EXPOSE ${PORT}

RUN pnpm fetch

RUN pnpm install --prefer-offline --prod=false

CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && pnpm build && pnpm start:prod"]
