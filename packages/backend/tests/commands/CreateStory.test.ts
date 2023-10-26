import { CreateStoryCommand } from "../../src/commands/CreateStory";
import { Story } from "../../src/domain/entities/Story";

describe("Config", () => {
  let fixtures: Sut;

  beforeEach(() => {
    fixtures = CreateStoryCreatorFitures();
  });

  it("Should add a story in catalog", () => {
    fixtures.givenTheCatalogOfStoriesIs([]);
    fixtures.whenCreateStory();
    fixtures.ThenCatalogShouldBe([
      { id: 1, textStory: "Once upon a time ..." },
    ]);
  });
});

const CreateStoryCreatorFitures = () => {
  let catalog: Array<Story>;

  const createStoryCommand = new CreateStoryCommand();
  return {
    givenTheCatalogOfStoriesIs: (_catalog: Array<Story>) => {
      catalog = _catalog;
    },
    whenCreateStory: () => {
      catalog.push(createStoryCommand.execute());
    },
    ThenCatalogShouldBe: (expectedCatalog: Array<Story>) => {
      expect(catalog).toEqual(expectedCatalog);
    },
  };
};

type Sut = ReturnType<typeof CreateStoryCreatorFitures>;
