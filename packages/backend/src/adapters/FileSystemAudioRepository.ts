import { FileAudioRepository } from "../domain/gateways/FileAudioRepository";
import * as fs from "node:fs";

export class FileSystemAudioRepository implements FileAudioRepository {
  constructor(private directory: string) {}
  async save(file: Buffer, fileName?: string): Promise<string> {
    const filePath = this.directory + "/" + fileName + ".mp3";
    fs.writeFileSync(filePath, file);
    return filePath;
  }
}
