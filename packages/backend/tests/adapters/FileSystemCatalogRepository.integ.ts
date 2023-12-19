import { mkdirSync, rmdirSync, writeFileSync, readFileSync } from "node:fs";
import { Story } from "../../src/domain/entities/Story";
import { StoryBuilder } from "../builders/StoryBuilder";
import { FileSystemCatalogRepository } from "../../src/adapters/FileSystemCatalogRepository";

const dir = __dirname + "/inMemory";
const file = dir + "/catalog.json";

describe("FileSystemCatalogRepository", () => {
  beforeAll(() => {
    mkdirSync(dir);
  });

  afterAll(() => {
    rmdirSync(dir, { recursive: true });
  });

  describe("Catalog is empty", () => {
    beforeEach(() => {
      // Initialize empty catalog
      const data: Story[] = [];
      const jsonData = JSON.stringify(data, null, 2);

      writeFileSync(file, jsonData);
    });

    it("Catalog should be empty", () => {
      const rawData = readFileSync(file, "utf-8");
      const catalog = JSON.parse(rawData);

      expect(catalog).toEqual([]);
    });

    it("Catalog should contains a story", async () => {
      const story = StoryBuilder().build();

      const catalogRepo = new FileSystemCatalogRepository(file);
      await catalogRepo.addStoryInCatalog(story);

      const catalog = getCatalog();

      expect(catalog).toEqual([story]);
    });
  });
});

function getCatalog(): Story[] {
  const rawData = readFileSync(file, "utf-8");
  return JSON.parse(rawData);
}
