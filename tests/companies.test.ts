import { stub } from "sinon";
import { CompaniesService } from "../src/db/companies.ts";
import { superoak } from "superoak";
import app from "../src/app.ts";
import { assertEquals } from "std/testing/asserts.ts";

// test companies route
Deno.test("GET request to /companies should return companies", async () => {
  const getCompaniesStub = stub(CompaniesService, "getCompanies");
  getCompaniesStub.returns(
    Promise.resolve([
      { id: 1, name: "Company 1" },
      { id: 2, name: "Company 2" },
    ])
  );

  const testClient = await superoak(app);
  await testClient
    .get("/companies")
    .expect(200)
    .expect([
      { id: 1, name: "Company 1" },
      { id: 2, name: "Company 2" },
    ]);

  // asset stub was called
  assertEquals(getCompaniesStub.called, true);

  getCompaniesStub.restore();
});

// test it will fail if we send non numeric page and limit
Deno.test(
  "GET request to /companies should return 400 if page and limit are not numeric by default to page 1 and limit 10",
  async () => {
    const testClient = await superoak(app);
    await testClient
      .get("/companies?page=abc&limit=def")
      .expect(400)
      .expect(/invalid/i);
  }
);
