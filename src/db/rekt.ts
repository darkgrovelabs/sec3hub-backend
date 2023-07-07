import { sql } from "./db.ts";

// custom sort logic
const getRekts = async (page: number, limit: number, sort: string) => {
  // get the offset from the page and limit
  const offset = (page - 1) * limit;

  // stuff we want to sort descending the rest will be ascending
  const descSort = ["date", "damage", "created_at"];

  const isDesc = descSort.includes(sort) ? true : false;

  const rekts = await sql`
        SELECT * FROM rekt
        ${
          isDesc
            ? sql`ORDER BY ${sql(sort)} DESC`
            : sql`ORDER BY ${sql(sort)} ASC`
        }
        OFFSET ${offset}
        LIMIT ${limit}
       `;

  return rekts;
};

export const RektsService = {
  getRekts,
};
