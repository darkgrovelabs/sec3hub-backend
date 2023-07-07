import { sql } from "./db.ts";

// custom sort logic
const getProducts = async (
  page: number,
  limit: number,
  sort: string,
  keyword: string,
  order: string
) => {
  // get the offset from the page and limit
  const offset = (page - 1) * limit;

  // stuff we want to sort descending the rest will be ascending
  // const descSort = ["total_audits", "up_votes", "start_year", "created_at"];
  // const isDesc = descSort.includes(sort) ? true : false;

  const isDesc = order === "desc" ? true : false;

  let products;

  if (!keyword) {
    products = await sql`
        SELECT * FROM product
        ${
          isDesc
            ? sql`ORDER BY ${sql(sort)} DESC`
            : sql`ORDER BY ${sql(sort)} ASC`
        }
        OFFSET ${offset}
        LIMIT ${limit}
        `;
  } else {
    products = await sql`
        SELECT * FROM product 
        WHERE name ILIKE ${"%" + keyword + "%"}
        OR type ILIKE ${"%" + keyword + "%"}
        OR location ILIKE ${"%" + keyword + "%"}
        OR services::text ILIKE ${"%" + keyword + "%"}

        ${
          isDesc
            ? sql`ORDER BY ${sql(sort)} DESC`
            : sql`ORDER BY ${sql(sort)} ASC`
        }
        OFFSET ${offset}
        LIMIT ${limit}
        `;
  }

  return products;
};

const getTotalProducts = async () => {
  const totalProducts = await sql`
    SELECT COUNT(*) FROM product`;
  return totalProducts;
};

// to make it work with sinons stub we need to wrap the function in an object
export const ProductsService = {
  getProducts,
  getTotalProducts,
};
