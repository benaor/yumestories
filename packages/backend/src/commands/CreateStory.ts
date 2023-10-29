import { Story } from "../domain/entities/Story";
import { CatalogRepository } from "../domain/gateways/CatalogRepository";
import { StoryTextGenerator } from "../domain/gateways/StoryTextGenerator";

export class CreateStoryCommand {
  constructor(
    private catalogRepo: CatalogRepository,
    private storyGenerator: StoryTextGenerator,
  ) {}

  async execute(): Promise<void> {
    const TextStory = await this.storyGenerator.generate();
    const audio = "http://localhost:3000/audio/";

    const story = new Story({
      id: TextStory.id,
      title: TextStory.title,
      textStory: TextStory.textStory,
      audio: audio,
    });

    await this.catalogRepo.addStoryInCatalog(story);
  }
}
