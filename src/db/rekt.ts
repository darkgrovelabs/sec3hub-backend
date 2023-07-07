import { sql } from "./db.ts";

// custom sort logic
const getRekts = async (
  page: number,
  limit: number,
  sort: string,
  keyword: string,
  order: string
) => {
  // get the offset from the page and limit
  const offset = (page - 1) * limit;

  const isDesc = order === "desc" ? true : false;

  let rekts;

  if (!keyword) {
    rekts = await sql`
        SELECT * FROM rekt
        ${
          isDesc
            ? sql`ORDER BY ${sql(sort)} DESC`
            : sql`ORDER BY ${sql(sort)} ASC`
        }
        OFFSET ${offset}
        LIMIT ${limit}
        `;
  } else {
    rekts = await sql`
        SELECT * FROM rekt 
        WHERE name ILIKE ${"%" + keyword + "%"}
        OR category ILIKE ${"%" + keyword + "%"}
        OR auidted_by::text ILIKE ${"%" + keyword + "%"}
        OR txs::text ILIKE ${"%" + keyword + "%"}

        ${
          isDesc
            ? sql`ORDER BY ${sql(sort)} DESC`
            : sql`ORDER BY ${sql(sort)} ASC`
        }
        OFFSET ${offset}
        LIMIT ${limit}
        `;
  }

  return rekts;
};

// get total number of rekts

const getTotalRekts = async () => {
  const totalRekts = await sql`
    SELECT COUNT(*) FROM rekt`;
  return totalRekts;
};

// get total keyword hits
const getTotalKeywordHits = async (keyword: string) => {
  const totalKeywordHits = await sql`
    SELECT * FROM rekt 
    WHERE name ILIKE ${"%" + keyword + "%"}
    OR category ILIKE ${"%" + keyword + "%"}
    OR auidted_by::text ILIKE ${"%" + keyword + "%"}
    OR txs::text ILIKE ${"%" + keyword + "%"}
      `;
  return totalKeywordHits;
};

export const RektsService = {
  getRekts,
  getTotalRekts,
  getTotalKeywordHits,
};
