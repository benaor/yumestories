import { FileImageRepository } from "../domain/gateways/FileImageRepository";
import * as fs from "node:fs";

export class FileSystemImageRepository implements FileImageRepository {
  constructor(private directory: string) {}
  async save(file: Buffer, fileName: string): Promise<string> {
    const filePath = this.directory + "/" + fileName + ".png";
    fs.writeFileSync(filePath, file);
    return filePath;
  }
}
