# deno-giphy

deno-giphy

documentation: <https://documenter.getpostman.com/view/3827865/Szmjyv1c?version=latest>

## Requirement

- install deno
- install mongodb
- install denon

## Testing and run

```zsh
// install deps
$ deno cache --unstable server.ts

// run in local
$ deno run --allow-net --allow-read --allow-write --allow-plugin --allow-env --unstable server.ts

// use denon
$ denon run --allow-net --allow-read --allow-write --allow-plugin --allow-env --unstable server.ts

// allow all permission
$ deno run -A --unstable server.ts

// run test case
$ deno test --allow-net --allow-read --allow-write --allow-plugin --allow-env --unstable

// linter
$ deno lint --unstable

// format code
$ deno fmt
```

## Docker

```zsh
// build images and start container in one line
docker-compose up -d --build

// go inside container
docker exec -it <containerId> /bin/bash

// check container logs
docker logs <containerId>

// remove and stop container
docker-compose down
```

open localhost:3000

## Contributing

Please refer to [CONTRIBUTING.md](https://github.com/yeukfei02/deno-giphy/blob/master/CONTRIBUTING.md)
