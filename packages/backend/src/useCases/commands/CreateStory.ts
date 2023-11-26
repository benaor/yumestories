import { Story } from "../../domain/entities/Story";
import { CatalogRepository } from "../../domain/gateways/CatalogRepository";
import { FileAudioRepository } from "../../domain/gateways/FileAudioRepository";
import { IdGenerator } from "../../domain/gateways/IdGenerator";
import { StoryTextGenerator } from "../../domain/gateways/StoryTextGenerator";
import { StoryVoiceGenerator } from "../../domain/gateways/StoryVoiceGenerator";

export class CreateStoryCommand {
  constructor(
    private idGenerator: IdGenerator,
    private catalogRepo: CatalogRepository,
    private storyGenerator: StoryTextGenerator,
    private voiceGenerator: StoryVoiceGenerator,
    private FileAudioRepository: FileAudioRepository,
  ) {}

  async execute(): Promise<void> {
    const id = this.idGenerator.generate();
    const { title, text } = await this.storyGenerator.generate();

    const audioFile = await this.voiceGenerator.generate(text);
    const audioPath = await this.FileAudioRepository.save(audioFile);

    const story = new Story({ id, title, text, audio: audioPath });

    await this.catalogRepo.addStoryInCatalog(story);
  }
}
