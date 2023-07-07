import {
  Application,
  Router,
  companiesRounter,
  rektsRouter,
  productsRouter,
  resourcesRouter,
  oakCors,
} from "./deps.ts";

const app = new Application();

// Base route
const router = new Router();
router.get("/", (ctx) => {
  ctx.response.body = "Sec3hub.xyz Backbone!";
});

// Companies route
router.use("/companies", companiesRounter.routes());
// Rekts route
router.use("/rekts", rektsRouter.routes());
// Products route
router.use("/products", productsRouter.routes());
// Resources route
router.use("/resources", resourcesRouter.routes());

// set up CORS to allow requests
app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

export default app;
