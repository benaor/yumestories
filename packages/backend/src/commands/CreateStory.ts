import { Story } from "../domain/entities/Story";
import { CatalogRepository } from "../domain/gateways/CatalogRepository";
import { StoryTextGenerator } from "../domain/gateways/StoryTextGenerator";
import { StoryVoiceGenerator } from "../domain/gateways/StoryVoiceGenerator";

export class CreateStoryCommand {
  constructor(
    private catalogRepo: CatalogRepository,
    private storyGenerator: StoryTextGenerator,
    private voiceGenerator: StoryVoiceGenerator,
  ) {}

  async execute(): Promise<void> {
    const { id, title, text } = await this.storyGenerator.generate();
    const audio = await this.voiceGenerator.generate(text);

    const story = new Story({
      id,
      title,
      text,
      audio,
    });

    await this.catalogRepo.addStoryInCatalog(story);
  }
}
