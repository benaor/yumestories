import { mkdirSync, rmdirSync, existsSync } from "node:fs";
import { FileSystemImageRepository } from "../../src/adapters/FileSystemImageRepository";

const dir = __dirname + "/inMemory";

describe("FileSystemImageRepository", () => {
  beforeAll(() => {
    mkdirSync(dir);
  });

  afterAll(() => {
    rmdirSync(dir, { recursive: true });
  });

  it("Should contains image file", async () => {
    const imageBuffer = Buffer.from("image");
    const imageRepo = new FileSystemImageRepository(dir);

    await imageRepo.save(imageBuffer, "testedAudioFile");

    const isExisted = existsSync(dir + "/testedAudioFile.png");

    expect(isExisted).toBeTruthy();
  });
});
