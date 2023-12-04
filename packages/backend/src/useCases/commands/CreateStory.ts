import { Story } from "../../domain/entities/Story";
import { CatalogRepository } from "../../domain/gateways/CatalogRepository";
import { FileAudioRepository } from "../../domain/gateways/FileAudioRepository";
import { FileImageRepository } from "../../domain/gateways/FileImageRepository";
import { IdGenerator } from "../../domain/gateways/IdGenerator";
import { StoryImageGenerator } from "../../domain/gateways/StoryImageGenerator";
import { StoryTextGenerator } from "../../domain/gateways/StoryTextGenerator";
import { StoryVoiceGenerator } from "../../domain/gateways/StoryVoiceGenerator";

export class CreateStoryCommand {
  constructor(
    private idGenerator: IdGenerator,
    private catalogRepo: CatalogRepository,
    private storyGenerator: StoryTextGenerator,
    private voiceGenerator: StoryVoiceGenerator,
    private fileAudioRepository: FileAudioRepository,
    private fileImageRepository: FileImageRepository,
    private imageGenerator: StoryImageGenerator,
  ) {}

  async execute(): Promise<void> {
    const id = this.idGenerator.generate();
    const { title, text } = await this.storyGenerator.generate();

    const audioBuffer = await this.voiceGenerator.generate(text);
    const audio = await this.fileAudioRepository.save(audioBuffer);

    const [b1, b2, b3, b4] = await this.imageGenerator.generate(text, 4);

    const images = await Promise.all([
      this.fileImageRepository.save(b1, `${id}-1`),
      this.fileImageRepository.save(b2, `${id}-2`),
      this.fileImageRepository.save(b3, `${id}-3`),
      this.fileImageRepository.save(b4, `${id}-4`),
    ]);

    const story = new Story({ id, title, text, audio, images });

    await this.catalogRepo.addStoryInCatalog(story);
  }
}
