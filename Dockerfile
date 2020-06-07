FROM hayd/ubuntu-deno:1.0.5

RUN mkdir -p /app

WORKDIR /app

COPY ./ .

RUN deno cache --unstable server.ts

EXPOSE 3000

CMD [ "run", "-A", "--unstable", "server.ts" ]