import fs from "fs";
import path from "path";
import { publicFolder } from "../paths";
import sharp from "sharp";

export const imageExists = (name: string): boolean | string => {
  const file = path.join(publicFolder, `/assets/${name}.jpg`);
  if (fs.existsSync(file)) {
    return file;
  }
  return false;
};

export const thumbExists = (
  name: string,
  width: string,
  height: string
): boolean | string => {
  const file = path.join(
    publicFolder,
    `/assets/images/${name}-${width}x${height}.jpg`
  );
  if (fs.existsSync(file)) {
    return file;
  }
  return false;
};

export const transform = async (
  name: string,
  width: number,
  height: number
): Promise<string> => {
  const output = path.join(
    publicFolder,
    `/assets/images/${name}-${width}x${height}.jpg`
  );
  // try {
  //   await sharp(path.join(publicFolder, `/assets/${name}.jpg`))
  //     .resize({ width, height })
  //     .toFile(output);
  // } catch (error) {
  //   throw "can not find the image";
  // }
  return sharp(path.join(publicFolder, `/assets/${name}.jpg`))
    .resize({ width, height })
    .toFile(output)
    .then(() => output)
    .catch((error) => {
      throw error;
    });
};

export const cleanThumbFolder = (): void => {
  const imageFolder = path.join(publicFolder, `/assets/images`);
  fs.readdirSync(imageFolder).forEach((item) => {
    fs.unlinkSync(path.join(imageFolder, `/${item}`));
  });
};
