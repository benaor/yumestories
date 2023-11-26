import { Story } from "../../domain/entities/Story";
import { CatalogRepository } from "../../domain/gateways/CatalogRepository";
import { IdGenerator } from "../../domain/gateways/IdGenerator";
import { StoryTextGenerator } from "../../domain/gateways/StoryTextGenerator";
import { StoryVoiceGenerator } from "../../domain/gateways/StoryVoiceGenerator";

export class CreateStoryCommand {
  constructor(
    private idGenerator: IdGenerator,
    private catalogRepo: CatalogRepository,
    private storyGenerator: StoryTextGenerator,
    private voiceGenerator: StoryVoiceGenerator,
  ) {}

  async execute(): Promise<void> {
    const id = this.idGenerator.generate();
    const { title, text } = await this.storyGenerator.generate();
    const audio = await this.voiceGenerator.generate(text);

    const story = new Story({ id, title, text, audio });

    await this.catalogRepo.addStoryInCatalog(story);
  }
}
