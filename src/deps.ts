// put all the imports in one file deno convention and caching

//std
export { load } from "std/dotenv/mod.ts";

// oak
export { Router, Application } from "oak";
export { oakCors } from "cors";

// Controllers
export { companiesRounter } from "./api/companies.ts";
export { rektsRouter } from "./api/rekt.ts";
export { productsRouter } from "./api/products.ts";
export { resourcesRouter } from "./api/resources.ts";

// Services
export { sql } from "./db/db.ts";
export { CompaniesService } from "./db/companies.ts";
export { RektsService } from "./db/rekt.ts";
export { ProductsService } from "./db/products.ts";
export { ResourceService } from "./db/resources.ts";

// app
export { default as app } from "./app.ts";
