# Home Library Service

## Preconditions

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- git clone https://github.com/PavelOreshkin/nodejs2024Q3-service.git

# Home Library Service: Part 1

### Checkout branch

choose to branch `part_1`

### ENV

create `.env` file from `.env.example`

### Install

```
npm install
```

### Running application

```
npm run start:dev
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.

### Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

### Check lint errors

```
npm run lint
```

# Home Library Service: Part 2

### Checkout branch

choose to branch `part_2_docker`

### ENV

create `.env` file from `.env.example`

### Pull images (not required)

```
npm run docker:pull
```

### Run containers

With watch mode:

```
npm run docker:watch
```

without:

```
npm run docker:up
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.

### Testing app inside container

```
npm run docker:test
```

### Check lint errors inside container

```
npm run docker:lint
```

### Check image size

```
npm run docker:image-size
```

In my case 470mb

> [!IMPORTANT]  
> If I forget something and you have problem with start docker please text me in discord @pashk6802

# Home Library Service: Part 3

### Checkout branch

choose to branch `part_3_auth_logging`

### ENV

create `.env` file from `.env.example`

### Pull images (not required)

```
npm run docker:pull
```

### Run containers

With watch mode:

```
npm run docker:watch
```

without:

```
npm run docker:up
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.

### Testing app inside container

```
npm run docker:test:auth
```

```
npm run docker:test:refresh
```

### Check lint errors inside container

```
npm run docker:lint
```
