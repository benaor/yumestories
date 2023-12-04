import { Story } from "../../domain/entities/Story";
import { CatalogRepository } from "../../domain/gateways/CatalogRepository";
import { FileAudioRepository } from "../../domain/gateways/FileAudioRepository";
import { FileImageRepository } from "../../domain/gateways/FileImageRepository";
import { IdGenerator } from "../../domain/gateways/IdGenerator";
import { StoryImageGenerator } from "../../domain/gateways/StoryImageGenerator";
import { StoryTextGenerator } from "../../domain/gateways/StoryTextGenerator";
import { StoryVoiceGenerator } from "../../domain/gateways/StoryVoiceGenerator";

export interface CreateStoryUseCaseConfig {
  idGenerator: IdGenerator;
  catalogRepository: CatalogRepository;
  storyGenerator: StoryTextGenerator;
  voiceGenerator: StoryVoiceGenerator;
  fileAudioRepository: FileAudioRepository;
  fileImageRepository: FileImageRepository;
  imageGenerator: StoryImageGenerator;
}

export class CreateStoryUseCase {
  constructor(private deps: CreateStoryUseCaseConfig) {}

  async execute(): Promise<void> {
    const id = this.deps.idGenerator.generate();
    const { title, text } = await this.deps.storyGenerator.generate();

    const audioBuffer = await this.deps.voiceGenerator.generate(text);
    const audio = await this.deps.fileAudioRepository.save(audioBuffer);

    const [b1, b2, b3, b4] = await this.deps.imageGenerator.generate(text, 4);

    const images = await Promise.all([
      this.deps.fileImageRepository.save(b1, `${id}-1`),
      this.deps.fileImageRepository.save(b2, `${id}-2`),
      this.deps.fileImageRepository.save(b3, `${id}-3`),
      this.deps.fileImageRepository.save(b4, `${id}-4`),
    ]);

    const story = new Story({ id, title, text, audio, images });

    await this.deps.catalogRepository.addStoryInCatalog(story);
  }
}
