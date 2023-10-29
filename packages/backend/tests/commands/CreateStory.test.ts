import { StoryBuilder } from "../builders/StoryBuilder";
import { StoryTextBuilder } from "../builders/StoryTextBuilder";
import {
  CreateStoryCreatorFitures,
  StoryCreatorSut,
} from "../suts/StoryFixtures";

describe("Create Story use Case", () => {
  let fixtures: StoryCreatorSut;

  beforeEach(() => {
    fixtures = CreateStoryCreatorFitures();
  });

  it("Should add a 'Hansel et Gretel' in catalog", async () => {
    const snowWhiteText = StoryTextBuilder().build();
    const snowWhiteStory = StoryBuilder().build();

    fixtures.givenTheCatalogOfStoriesIs([]);
    fixtures.givenStoryTexthasBeenGenerated(snowWhiteText);

    await fixtures.whenCreateStory();

    fixtures.ThenCatalogShouldBe([snowWhiteStory]);
  });

  it("The story should be 'Moby-Dick'", async () => {
    fixtures.givenTheCatalogOfStoriesIs([]);

    const mobyDickText = StoryTextBuilder()
      .withTitle("Moby-Dick")
      .withTextStory("Somewhere in the sea ...")
      .build();

    const mobyDickStory = StoryBuilder()
      .withId(2)
      .withTitle("Moby-Dick")
      .withTextStory("Somewhere in the sea ...")
      .withAudio("http://localhost:3000/audio/2")
      .build();

    fixtures.givenIdIsGenerated(2);
    fixtures.givenStoryTexthasBeenGenerated(mobyDickText);

    await fixtures.whenCreateStory();

    fixtures.ThenCatalogShouldBe([mobyDickStory]);
  });

  it("The catalog should contain 2 stories", async () => {
    fixtures.givenTheCatalogOfStoriesIs([]);

    // Story 1
    const snowWhiteText = StoryTextBuilder()
      .withTitle("Snow White")
      .withTextStory("Snow White, and the seven dwarfs ...")
      .build();
    const snowWhiteStory = StoryBuilder()
      .withId(1)
      .withTitle("Snow White")
      .withTextStory("Snow White, and the seven dwarfs ...")
      .withAudio("http://localhost:3000/audio/1")
      .build();

    fixtures.givenIdIsGenerated(1);
    fixtures.givenStoryTexthasBeenGenerated(snowWhiteText);

    await fixtures.whenCreateStory();

    fixtures.ThenCatalogShouldBe([snowWhiteStory]);

    // Story 2
    const redRidingHoodText = StoryTextBuilder()
      .withTitle("The little red riding hood")
      .withTextStory("A little red riding hood ...")
      .build();

    const redRidingHoodStory = StoryBuilder()
      .withId(2)
      .withTitle("The little red riding hood")
      .withTextStory("A little red riding hood ...")
      .withAudio("http://localhost:3000/audio/2")
      .build();

    fixtures.givenIdIsGenerated(2);
    fixtures.givenStoryTexthasBeenGenerated(redRidingHoodText);

    await fixtures.whenCreateStory();

    fixtures.ThenCatalogShouldBe([snowWhiteStory, redRidingHoodStory]);
  });
});
