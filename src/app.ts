import { Application, Router, companiesRounter, oakCors } from "./deps.ts";

const app = new Application();

// Base route
const router = new Router();
router.get("/", (ctx) => {
  ctx.response.body = "Sec3hub.xyz Backbone!";
});

// Companies route
router.use("/companies", companiesRounter.routes());

// set up CORS to allow requests
app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

export default app;
