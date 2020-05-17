FROM hayd/ubuntu-deno:1.0.0

RUN mkdir -p /app

WORKDIR /app

COPY ./ .

RUN deno cache --unstable server.ts

EXPOSE 3000

CMD [ "run", "--allow-net", "--allow-read", "--allow-write", "--allow-plugin", "--unstable", "server.ts" ]