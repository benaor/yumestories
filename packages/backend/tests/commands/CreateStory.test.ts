import { CreateStoryCommand } from "../../src/commands/CreateStory";
import { Story } from "../../src/domain/entities/Story";
import { TextStory } from "../../src/domain/entities/TextStory";
import { CatalogRepository } from "../../src/domain/gateways/CatalogRepository";
import { StoryTextGenerator } from "../../src/domain/gateways/StoryTextGenerator";

describe("Create Story use Case", () => {
  let fixtures: Sut;

  beforeEach(() => {
    fixtures = CreateStoryCreatorFitures();
  });

  it("Should add a 'Hansel et Gretel' in catalog", async () => {
    fixtures.givenTheCatalogOfStoriesIs([]);
    fixtures.givenStoryTexthasBeenGenerated({
      id: 1,
      title: "hansel et gretel",
      textStory: "Once upon a time ...",
    });

    await fixtures.whenCreateStory();

    fixtures.ThenCatalogShouldBe([
      { id: 1, title: "hansel et gretel", textStory: "Once upon a time ..." },
    ]);
  });

  it("The catalog should contain 2 stories", async () => {
    // Story 1
    fixtures.givenTheCatalogOfStoriesIs([]);

    fixtures.givenStoryTexthasBeenGenerated({
      id: 1,
      title: "hansel et gretel",
      textStory: "Once upon a time ...",
    });

    await fixtures.whenCreateStory();

    fixtures.ThenCatalogShouldBe([
      { id: 1, title: "hansel et gretel", textStory: "Once upon a time ..." },
    ]);

    // Story 2
    fixtures.givenStoryTexthasBeenGenerated({
      id: 2,
      title: "hansel et gretel",
      textStory: "Once upon a time ...",
    });

    await fixtures.whenCreateStory();

    fixtures.ThenCatalogShouldBe([
      { id: 1, title: "hansel et gretel", textStory: "Once upon a time ..." },
      { id: 2, title: "hansel et gretel", textStory: "Once upon a time ..." },
    ]);
  });

  it("The story should be 'Moby-Dick'", async () => {
    fixtures.givenTheCatalogOfStoriesIs([]);

    fixtures.givenStoryTexthasBeenGenerated({
      id: 1,
      title: "Moby-Dick",
      textStory: "Somewhere in the sea ...",
    });
    await fixtures.whenCreateStory();

    fixtures.ThenCatalogShouldBe([
      { id: 1, title: "Moby-Dick", textStory: "Somewhere in the sea ..." },
    ]);
  });
});

const CreateStoryCreatorFitures = () => {
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

  const createStoryCommand = new CreateStoryCommand(
    stubCatalogRepository,
    stubStoryGenerator,
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

type Sut = ReturnType<typeof CreateStoryCreatorFitures>;
