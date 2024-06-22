FROM node:lts-alpine

ENV NODE_ENV=development
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

WORKDIR /app
COPY yarn.lock package.json ./
RUN yarn install
COPY . .
EXPOSE 3000

CMD ["yarn", "dev"]