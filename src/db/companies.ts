import { sql } from "./db.ts";

const getCompanies = async (
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

  let companies;

  if (!keyword) {
    companies = await sql`
        SELECT * FROM company
        ${
          isDesc
            ? sql`ORDER BY ${sql(sort)} DESC`
            : sql`ORDER BY ${sql(sort)} ASC`
        }
        OFFSET ${offset}
        LIMIT ${limit}
        `;
  } else {
    companies = await sql`
        SELECT * FROM company 
        WHERE name ILIKE  ${"%" + keyword + "%"}
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

  return companies;
};

// get total number of companies

const getTotalCompanies = async () => {
  const totalCompanies = await sql`
    SELECT COUNT(*) FROM company`;
  return totalCompanies;
};

// to make it work with sinons stub we need to wrap the function in an object
export const CompaniesService = {
  getCompanies,
  getTotalCompanies,
};
