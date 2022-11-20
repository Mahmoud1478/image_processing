import app from "../index";
import supertest from "supertest";

const HttpReqest = supertest(app);

describe("App", (): void => {
  it("testing if App is runing", async () => {
    const response = await HttpReqest.get("/");
    expect(response.status).toBe(200);
  });
});
