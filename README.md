# deno-giphy

deno-giphy

documentation: https://documenter.getpostman.com/view/3827865/Szmjyv1c?version=latest

## Requirement:
 - install deno
 - install mongodb
 - install denon

## Testing and run:
```
// install deps
$ deno cache --unstable server.ts

// run in local
$ deno run --allow-net --allow-read --allow-write --allow-plugin --unstable server.ts

// use denon
$ denon run --allow-net --allow-read --allow-write --allow-plugin --unstable server.ts

// allow all permission
$ deno run -A --unstable server.ts

// run test case
$ deno test --allow-net --allow-read --allow-write --allow-plugin --unstable

// format code
$ deno fmt
```

## Docker:

- Dockerfile

build images and start container
```
docker build -t <username>/deno-giphy:<tag> .
docker run -p 3000:3000 -d <username>/deno-giphy:<tag>
docker exec -it <containerId> /bin/bash
docker logs <containerId>
```

check images and container
```
docker images
docker ps
docker ps -a
```

open localhost:3000

- docker-compose.yml

build images and start container
```
docker-compose build
docker-compose up
```

build images and start container in one line
```
docker-compose up -d --build
```

stop container
```
docker-compose stop
```

add tag to docker images
```
$ docker tag <imageId> <dockerHubUserName>/<imageName>:<tag>
```

push docker images to docker hub
```
$ docker push <dockerHubUserName>/<imageName>:<tag>
```

open localhost:3000

## Contributing

Please refer to [CONTRIBUTING.md](https://github.com/yeukfei02/deno-giphy/blob/master/CONTRIBUTING.md)
