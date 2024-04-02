#----------Stage 1----------
FROM node:18-alpine as builder

#[Start] Define the environment variables
ARG ENV
ARG VERSION
#[End] Define the environment variables

#[Start] Environment variables validation
RUN test -n "$VERSION" || (echo "VERSION  not set" && false)
RUN test -n "$ENV" || (echo "ENV  not set" && false)
#[End] Environment variables
RUN npm i -g pnpm
WORKDIR /app
COPY package.json .
COPY pnpm-lock.yaml .
RUN pnpm install
COPY . .
RUN VITE_VERSION=${VERSION} pnpm build:${ENV}



#----------Stage 2----------
FROM nginx:latest
COPY ./default.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist .

CMD ["nginx", "-g", "daemon off;"]