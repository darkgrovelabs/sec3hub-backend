import { Router, RektsService } from "../deps.ts";

const rektsRouter = new Router();

rektsRouter.get("/", async (ctx) => {
  // get the query string parameters for page and limit
  const page = ctx.request.url.searchParams.get("page");
  const limit = ctx.request.url.searchParams.get("limit");
  const sort = ctx.request.url.searchParams.get("sort");

  // sort allowed values whitelist
  const sortAllowedValues = [
    "id",
    "name",
    "category",
    "damage",
    "date",
    "created_at",
  ];

  // validate sort value
  if (sort && !sortAllowedValues.includes(sort)) {
    ctx.response.status = 400;
    ctx.response.body = {
      error: "invalid sort value",
    };
    return;
  }

  // validate page and limit
  try {
    if (page && isNaN(parseInt(page))) throw new Error("invalid page");
    if (limit && isNaN(parseInt(limit))) throw new Error("invalid limit");
  } catch {
    ctx.response.status = 400;
    ctx.response.body = "invalid page or limit";
    return;
  }

  // get the rekts from the database
  const rekts = await RektsService.getRekts(
    page ? parseInt(page) : 1,
    limit ? parseInt(limit) : 10,
    sort ? sort : "id"
  );

  // set the response body
  ctx.response.body = rekts;
});

export { rektsRouter };
