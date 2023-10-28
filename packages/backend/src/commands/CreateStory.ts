import { CatalogRepository } from "../domain/gateways/CatalogRepository";
import { StoryTextGenerator } from "../domain/gateways/StoryTextGenerator";

export class CreateStoryCommand {
  constructor(
    private catalogRepo: CatalogRepository,
    private storyGenerator: StoryTextGenerator,
  ) {}

  async execute(): Promise<void> {
    const story = await this.storyGenerator.generate();

    await this.catalogRepo.addStoryInCatalog(story);
  }
}
