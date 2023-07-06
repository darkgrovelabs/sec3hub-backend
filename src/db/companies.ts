import { sql } from "./db.ts";

// custom sort logic
const getCompanies = async (page: number, limit: number, sort: string) => {
  // get the offset from the page and limit
  const offset = (page - 1) * limit;

  // // stuff we want to sort descending the rest will be ascending
  const descSort = ["total_audits", "up_votes", "start_year", "created_at"];

  let companies;

  // can't put two sql() in one query
  if (descSort.includes(sort)) {
    companies = await sql`
        SELECT * FROM company
        ORDER BY ${sql(sort)} DESC
        OFFSET ${offset}
        LIMIT ${limit}
    `;
    return companies;
  }
  companies = await sql`
        SELECT * FROM company
        ORDER BY ${sql(sort)} ASC
        OFFSET ${offset}
        LIMIT ${limit}
    `;

  return companies;
};

// to make it work with sinons stub we need to wrap the function in an object
export const CompaniesService = {
  getCompanies,
};
