import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Search Gyms (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to search gyms by title", async () => {
    const { token } = await createAndAuthenticateUser(app);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Academia da Ana",
        description: "Some Description",
        phone: "1212345678",
        latitude: -23.2925701,
        longitude: -45.94315,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Academia da Grace",
        description: "Some Description",
        phone: "1212345678",
        latitude: -23.2925701,
        longitude: -45.94315,
      });

    const response = await request(app.server)
      .get("/gyms/search")
      .set("Authorization", `Bearer ${token}`)
      .query({
        query: "Ana",
      })
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "Academia da Ana",
      }),
    ]);
  });
});
