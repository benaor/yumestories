import { Story } from "../../src/domain/entities/Story";
import { TextStory } from "../../src/domain/entities/TextStory";
import { CatalogRepository } from "../../src/domain/gateways/CatalogRepository";
import { StoryTextGenerator } from "../../src/domain/gateways/StoryTextGenerator";
import { CreateStoryCommand } from "../../src/commands/CreateStory";
import { StoryVoiceGenerator } from "../../src/domain/gateways/StoryVoiceGenerator";

export const CreateStoryCreatorFitures = () => {
  let catalog: Array<Story>;
  let StoryGenerated: TextStory;

  const stubCatalogRepository: CatalogRepository = {
    addStoryInCatalog: async (story: Story) => {
      catalog.push(story);
    },
  };

  const stubStoryGenerator: StoryTextGenerator = {
    generate: async () => {
      return StoryGenerated;
    },
  };

  const stubStoryVoiceGenerator: StoryVoiceGenerator = {
    generate: async () => `http://localhost:3000/audio/${StoryGenerated.id}`,
  };

  const createStoryCommand = new CreateStoryCommand(
    stubCatalogRepository,
    stubStoryGenerator,
    stubStoryVoiceGenerator,
  );

  return {
    givenTheCatalogOfStoriesIs: (_catalog: Array<Story>) => {
      catalog = _catalog;
    },
    givenStoryTexthasBeenGenerated: (_story: TextStory) => {
      StoryGenerated = _story;
    },
    whenCreateStory: async () => {
      await createStoryCommand.execute();
    },
    ThenCatalogShouldBe: (expectedCatalog: Array<Story>) => {
      expect(catalog).toEqual(expectedCatalog);
    },
  };
};

export type StoryCreatorSut = ReturnType<typeof CreateStoryCreatorFitures>;
