import { stub } from "sinon";
import { RektsService } from "../src/db/rekt.ts";
import { superoak } from "superoak";
import app from "../src/app.ts";
import { assertEquals } from "std/testing/asserts.ts";

// test rekts route
Deno.test("GET request to /rekts should return rekt database", async () => {
  const getRektsStub = stub(RektsService, "getRekts");
  getRektsStub.returns(
    Promise.resolve([
      { id: 1, name: "Rekt 1" },
      { id: 2, name: "Rekt 2" },
    ])
  );

  const testClient = await superoak(app);
  await testClient
    .get("/rekts")
    .expect(200)
    .expect([
      { id: 1, name: "Rekt 1" },
      { id: 2, name: "Rekt 2" },
    ]);
  // asset stub was called
  assertEquals(getRektsStub.called, true);

  getRektsStub.restore();
});

// test it will fail if we send non numeric page and limit
Deno.test(
  "GET request to /rekts should return 400 if page and limit are not numeric by default to page 1 and limit 10",
  async () => {
    const testClient = await superoak(app);
    await testClient
      .get("/rekts?page=abc&limit=def")
      .expect(400)
      .expect(/invalid/i);
  }
);
