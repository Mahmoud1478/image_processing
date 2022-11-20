import path from "path";
import {
  cleanThumbFolder,
  imageExists,
  thumbExists,
  transform,
} from "../../services/imageService";
import { publicFolder } from "../../paths";

describe("image service", (): void => {
  beforeAll(cleanThumbFolder);

  it("check if image exsits", (): void => {
    expect(imageExists("image")).toEqual(
      path.join(publicFolder, `/assets/image.jpg`)
    );
  });

  it("check if image is not exsit", (): void => {
    expect(imageExists("image2")).toBeFalse();
  });

  it("check if thumb is not exsit", (): void => {
    expect(thumbExists("image", "100", "100")).toBeFalse();
  });

  it("process un found image", async (): Promise<void> => {
    await expectAsync(transform("image2", 100, 100)).toBeRejected();
    // await expectAsync(
    //   new Promise(async (resolve, reject): Promise<void> => {
    //     try {
    //       resolve(await transform("image2", 100, 100));
    //     } catch (error) {
    //       reject(error);
    //     }
    //   })
    // ).toBeRejectedWithError();
    //   expect(async () => {
    //     await transform("image2", 100, 100);
    //   }).toThrowError();
  });

  it("process image", async (): Promise<void> => {
    await expectAsync(transform("image", 100, 100)).toBeResolved();
  });

  it("check if thumb exsits", async (): Promise<void> => {
    expect(thumbExists("image", "100", "100")).toEqual(
      path.join(publicFolder, `/assets/images/image-100x100.jpg`)
    );
  });

  afterAll(cleanThumbFolder);
});
