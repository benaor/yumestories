import { Story } from "../domain/entities/Story";
import { CatalogRepository } from "../domain/gateways/CatalogRepository";
import * as fs from "node:fs";

export class FileSystemCatalogRepository implements CatalogRepository {
  constructor(private filePath: string) {}
  async addStoryInCatalog(story: Story): Promise<void> {
    const rawData = fs.readFileSync(this.filePath, "utf-8");
    const catalog = JSON.parse(rawData) as Story[];

    const newCatalog = [...catalog, story];
    const newStringCatalog = JSON.stringify(newCatalog, null, 2);

    fs.writeFileSync(this.filePath, newStringCatalog);
  }
}
