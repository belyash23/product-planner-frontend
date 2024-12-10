# product-planner-frontend

## Running with docker

To run the application with docker, we need the following commands:

1. `docker build -t dockerize-vue-3 .`
2. `docker run -it -p 8080:80 dockerize-vue-3`

And then go to the browser [App vue](http://localhost:8080) you should see the app.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
