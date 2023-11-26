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
    const snowWhiteStory = StoryBuilder().withId("1").build();

    fixtures.givenTheCatalogOfStoriesIs([]);
    fixtures.givenStoryTexthasBeenGenerated(snowWhiteText);
    fixtures.givenAudioHasBeenStockedHere("http://localhost:3000/audio/1");

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
      .withId("2")
      .withTitle("Moby-Dick")
      .withTextStory("Somewhere in the sea ...")
      .withAudio("http://localhost:3000/audio/2")
      .build();

    fixtures.givenIdIsGenerated("2");
    fixtures.givenStoryTexthasBeenGenerated(mobyDickText);
    fixtures.givenAudioHasBeenStockedHere("http://localhost:3000/audio/2");

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
      .withId("550e8400-e29b-41d4-a716-446655440000")
      .withTitle("Snow White")
      .withTextStory("Snow White, and the seven dwarfs ...")
      .withAudio(
        "http://localhost:3000/audio/550e8400-e29b-41d4-a716-446655440000",
      )
      .build();

    fixtures.givenIdIsGenerated("550e8400-e29b-41d4-a716-446655440000");
    fixtures.givenStoryTexthasBeenGenerated(snowWhiteText);

    await fixtures.whenCreateStory();

    fixtures.ThenCatalogShouldBe([snowWhiteStory]);

    // Story 2
    const redRidingHoodText = StoryTextBuilder()
      .withTitle("The little red riding hood")
      .withTextStory("A little red riding hood ...")
      .build();

    const redRidingHoodStory = StoryBuilder()
      .withId("550e8400-e29b-41d4-a716-446655440001")
      .withTitle("The little red riding hood")
      .withTextStory("A little red riding hood ...")
      .withAudio(
        "http://localhost:3000/audio/550e8400-e29b-41d4-a716-446655440001",
      )
      .build();

    fixtures.givenIdIsGenerated("550e8400-e29b-41d4-a716-446655440001");
    fixtures.givenStoryTexthasBeenGenerated(redRidingHoodText);
    fixtures.givenAudioHasBeenStockedHere(
      "http://localhost:3000/audio/550e8400-e29b-41d4-a716-446655440001",
    );

    await fixtures.whenCreateStory();

    fixtures.ThenCatalogShouldBe([snowWhiteStory, redRidingHoodStory]);
  });
});
