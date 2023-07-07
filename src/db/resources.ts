import { sql } from "./db.ts";

// custom sort logic
const getResources = async (
  page: number,
  limit: number,
  sort: string,
  keyword: string,
  order: string
) => {
  // get the offset from the page and limit
  const offset = (page - 1) * limit;

  const isDesc = order === "desc" ? true : false;

  let resources;

  if (!keyword) {
    resources = await sql`
        SELECT * FROM resource
        ${
          isDesc
            ? sql`ORDER BY ${sql(sort)} DESC`
            : sql`ORDER BY ${sql(sort)} ASC`
        }
        OFFSET ${offset}
        LIMIT ${limit}
        `;
  } else {
    resources = await sql`
        SELECT * FROM resource 
        WHERE category ILIKE ${"%" + keyword + "%"}
        OR description ILIKE ${"%" + keyword + "%"}
        ${
          isDesc
            ? sql`ORDER BY ${sql(sort)} DESC`
            : sql`ORDER BY ${sql(sort)} ASC`
        }
        OFFSET ${offset}
        LIMIT ${limit}
        `;
  }

  return resources;
};

// get total number of resources

const getTotalResources = async () => {
  const totalRekts = await sql`
    SELECT COUNT(*) FROM resource`;
  return totalRekts;
};

export const ResourceService = {
  getResources,
  getTotalResources,
};
