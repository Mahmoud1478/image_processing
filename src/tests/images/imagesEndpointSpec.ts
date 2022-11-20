import supertest from "supertest";
import app from "../../index";
import { cleanThumbFolder } from "../../services/imageService";
const HttpReqest = supertest(app);

describe("image end point", (): void => {
  beforeAll(cleanThumbFolder);

  it("should fail when prams is not provided", async (): Promise<void> => {
    const response = await HttpReqest.get("/images");
    expect(response.status).toBe(422);
  });
  it("should fail when name is not provided", async (): Promise<void> => {
    const response = await HttpReqest.get("/images?width=100&height=100");
    expect(response.status).toBe(422);
  });

  it("should fail when width is not provided", async (): Promise<void> => {
    const response = await HttpReqest.get("/images?name=image&height=100");
    expect(response.status).toBe(422);
  });

  it("should fail when height is not provided", async (): Promise<void> => {
    const response = await HttpReqest.get("/images?name=image&width=100");
    expect(response.status).toBe(422);
  });

  it("should fail when height is string", async (): Promise<void> => {
    const response = await HttpReqest.get(
      "/images?name=image&width=100&height=abc"
    );
    expect(response.status).toBe(422);
  });

  it("should fail when height is not vaild integer", async (): Promise<void> => {
    const response = await HttpReqest.get(
      "/images?name=image&width=100&height=x100"
    );
    expect(response.status).toBe(422);
  });

  it("should fail when width is string", async (): Promise<void> => {
    const response = await HttpReqest.get(
      "/images?name=image&width=abc&height=100"
    );
    expect(response.status).toBe(422);
  });

  it("should fail when height is not vaild integer", async (): Promise<void> => {
    const response = await HttpReqest.get(
      "/images?name=image&width=x100&height=100"
    );
    expect(response.status).toBe(422);
  });

  it("should fail when image is not found", async (): Promise<void> => {
    const response = await HttpReqest.get(
      "/images?name=image2&width=100&height=100"
    );
    expect(response.status).toBe(404);
  });

  it("create new image", async (): Promise<void> => {
    const response = await HttpReqest.get(
      "/images?name=image&width=100&height=100"
    );

    expect(response.status).toBe(200);
  });

  it("use exist image", async (): Promise<void> => {
    const response = await HttpReqest.get(
      "/images?name=image&width=100&height=100"
    );
    expect(response.status).toBe(200);
  });

  afterAll(cleanThumbFolder);
});
