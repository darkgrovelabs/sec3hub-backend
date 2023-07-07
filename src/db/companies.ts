import { sql } from "./db.ts";

// custom sort logic
const getCompanies = async (page: number, limit: number, sort: string) => {
  // get the offset from the page and limit
  const offset = (page - 1) * limit;

  // stuff we want to sort descending the rest will be ascending
  const descSort = ["total_audits", "up_votes", "start_year", "created_at"];

  const isDesc = descSort.includes(sort) ? true : false;

  const companies = await sql`
        SELECT * FROM company
        ${
          isDesc
            ? sql`ORDER BY ${sql(sort)} DESC`
            : sql`ORDER BY ${sql(sort)} ASC`
        }
        OFFSET ${offset}
        LIMIT ${limit}
        `;

  return companies;
};
// to make it work with sinons stub we need to wrap the function in an object
export const CompaniesService = {
  getCompanies,
};
