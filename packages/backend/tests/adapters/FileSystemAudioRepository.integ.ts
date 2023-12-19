import { mkdirSync, rmdirSync, existsSync } from "node:fs";
import { FileSystemAudioRepository } from "../../src/adapters/FileSystemAudioRepository";

const dir = __dirname + "/inMemory";

describe("FileSystemCatalogRepository", () => {
  beforeAll(() => {
    mkdirSync(dir);
  });

  afterAll(() => {
    rmdirSync(dir, { recursive: true });
  });

  it("Should contains the audio file", async () => {
    const audioBuffer = Buffer.from("audio");
    const audioRepo = new FileSystemAudioRepository(dir);

    await audioRepo.save(audioBuffer, "testedfile");

    const isExisted = existsSync(dir + "/testedfile.mp3");

    expect(isExisted).toBeTruthy();
  });
});
