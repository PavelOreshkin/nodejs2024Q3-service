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

you can use two different modes
without watch:

```
npm run docker:build
```

with watch:

```
npm run docker:watch
```

> [!NOTE]  
> If you close terminal process can continue work, and second call "npm run docker:watch" will lead to error:
> `cannot take exclusive lock for project "nodejs2024q3-service": process with PID 36456 is still running`
> I didn't have enough time to figure out how to fix it other than rebooting the PC =(

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
