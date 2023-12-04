import { Story } from "../../src/domain/entities/Story";
import { TextStory } from "../../src/domain/entities/TextStory";
import { CatalogRepository } from "../../src/domain/gateways/CatalogRepository";
import { StoryTextGenerator } from "../../src/domain/gateways/StoryTextGenerator";
import { CreateStoryCommand } from "../../src/useCases/commands/CreateStory";
import { StoryVoiceGenerator } from "../../src/domain/gateways/StoryVoiceGenerator";
import { IdGenerator } from "../../src/domain/gateways/IdGenerator";
import { FileAudioRepository } from "../../src/domain/gateways/FileAudioRepository";
import { FileImageRepository } from "../../src/domain/gateways/FileImageRepository";
import { StoryImageGenerator } from "../../src/domain/gateways/StoryImageGenerator";

export const CreateStoryCreatorFitures = () => {
  let catalog: Array<Story>;
  let idGenerated: string = "550e8400-e29b-41d4-a716-446655440000";
  let storyGenerated: TextStory;
  let audioPath: string = ``;
  let imagesPath: string = ``;

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

  const stubStoryImageGenerator: StoryImageGenerator = {
    generate: async (_, count) =>
      Array.from({ length: count }, () => Buffer.from("image")),
  };

  const stubFileAudioRepository: FileAudioRepository = {
    save: async () => `${audioPath}/${idGenerated}`,
  };

  const stubFileImageRepository: FileImageRepository = {
    save: async (_, filename) => `${imagesPath}/${filename}`,
  };

  const createStoryCommand = new CreateStoryCommand(
    stubIdGenerator,
    stubCatalogRepository,
    stubStoryGenerator,
    stubStoryVoiceGenerator,
    stubFileAudioRepository,
    stubFileImageRepository,
    stubStoryImageGenerator,
  );

  return {
    givenTheCatalogOfStoriesIs: (_catalog: Array<Story>) => {
      catalog = _catalog;
    },
    givenIdIsGenerated: (_id: string) => {
      idGenerated = _id;
    },
    givenStoryTexthasBeenGenerated: (_story: TextStory) => {
      storyGenerated = _story;
    },
    givenAudioHasStockedHere: (_audioPath: string) => {
      audioPath = _audioPath;
    },
    givenImagesHasStockedHere: (_imagesPath: string) => {
      imagesPath = _imagesPath;
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
