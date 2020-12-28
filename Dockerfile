FROM alpine:3.11.2 AS server
EXPOSE 3000

RUN apk add --update        \
  nodejs==12.15.0-r1        \
  npm==12.15.0-r1

RUN npm set audit false
RUN npm config set strict-ssl false
RUN npm install -g @nestjs/cli@7.5.4 --silent

FROM server AS build

WORKDIR /app
COPY package.json /app

RUN npm install --silent

FROM server AS start

WORKDIR /app

COPY --from=build ["/app", "/app"]
COPY . /app

RUN npm run build

CMD [ "nest", "start" ]