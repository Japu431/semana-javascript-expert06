import fs from "fs";
import config from "./config.js";
import fsPromises from "fs/promises";
import { extname, join } from "path";

const {
  dir: { publicDirectory },
} = config;

export default class Service {
  createFileStream(filename) {
    return fs.createReadStream(filename);
  }

  async getFileInfo(file) {
    // file = home/index.html
    const fullFilePath = join(publicDirectory, file);
    // valida se existe , se não estoura erro!
    fsPromises.access(fullFilePath);
    const typeFile = extname(fullFilePath);

    return {
      type: typeFile,
      name: fullFilePath,
    };
  }

  async getFileStream(file) {
    const { name, type } = await this.getFileInfo(file);
    return {
      stream: this.createFileStream(name),
      type,
    };
  }
}
