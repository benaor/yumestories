import { Story } from "../../src/domain/entities/Story";
import { TextStory } from "../../src/domain/entities/TextStory";
import { CatalogRepository } from "../../src/domain/gateways/CatalogRepository";
import { StoryTextGenerator } from "../../src/domain/gateways/StoryTextGenerator";
import { CreateStoryCommand } from "../../src/useCases/commands/CreateStory";
import { StoryVoiceGenerator } from "../../src/domain/gateways/StoryVoiceGenerator";
import { IdGenerator } from "../../src/domain/gateways/IdGenerator";
import { FileAudioRepository } from "../../src/domain/gateways/FileAudioRepository";

export const CreateStoryCreatorFitures = () => {
  let catalog: Array<Story>;
  let idGenerated: string = "1";
  let storyGenerated: TextStory;
  let audioPath: string = `http://localhost:3000/audio/${idGenerated}`;
  const stubIdGenerator: IdGenerator = {
    generate: () => idGenerated,
  };

  const stubCatalogRepository: CatalogRepository = {
    addStoryInCatalog: async (story: Story) => {
      catalog.push(story);
    },
  };

  const stubStoryGenerator: StoryTextGenerator = {
    generate: async () => storyGenerated,
  };

  const stubStoryVoiceGenerator: StoryVoiceGenerator = {
    generate: async () => Buffer.from("audio"),
  };

  const stubFileAudioRepository: FileAudioRepository = {
    save: async () => audioPath,
  };

  const createStoryCommand = new CreateStoryCommand(
    stubIdGenerator,
    stubCatalogRepository,
    stubStoryGenerator,
    stubStoryVoiceGenerator,
    stubFileAudioRepository,
  );

  return {
    givenTheCatalogOfStoriesIs: (_catalog: Array<Story>) => {
      catalog = _catalog;
    },
    givenIdIsGenerated: (_id: string) => {
      idGenerated = _id;
      audioPath = `http://localhost:3000/audio/${_id}`;
    },
    givenStoryTexthasBeenGenerated: (_story: TextStory) => {
      storyGenerated = _story;
    },
    givenAudioHasBeenStockedHere: (_audioPath: string) => {
      audioPath = _audioPath;
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
