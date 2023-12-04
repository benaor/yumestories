import { StoryBuilder } from "../builders/StoryBuilder";
import { StoryTextBuilder } from "../builders/StoryTextBuilder";
import {
  CreateStoryCreatorFitures,
  StoryCreatorSut,
} from "../suts/StoryFixtures";

describe("Feature: Create Story", () => {
  let fixtures: StoryCreatorSut;

  beforeEach(() => {
    fixtures = CreateStoryCreatorFitures();
  });

  describe("Scenario: Create stories and add them in catalog", () => {
    it("Catalog should contain 'Hansel et Gretel'", async () => {
      const hanselAndGretelText = StoryTextBuilder()
        .withTitle("Hansel et Gretel")
        .withTextStory("Once upon a time")
        .build();

      const hanselAndGretelStory = StoryBuilder()
        .withTitle("Hansel et Gretel")
        .withTextStory("Once upon a time")
        .build();

      fixtures.givenTheCatalogOfStoriesIs([]);
      fixtures.givenStoryTexthasBeenGenerated(hanselAndGretelText);

      await fixtures.whenCreateStory();

      fixtures.ThenCatalogShouldBe([hanselAndGretelStory]);
    });

    it("Catalog should contain 'Moby-Dick'", async () => {
      fixtures.givenTheCatalogOfStoriesIs([]);

      const mobyDickText = StoryTextBuilder()
        .withTitle("Moby-Dick")
        .withTextStory("Somewhere in the sea ...")
        .build();

      const mobyDickStory = StoryBuilder()
        .withId("2")
        .withTitle("Moby-Dick")
        .withTextStory("Somewhere in the sea ...")
        .build();

      fixtures.givenIdIsGenerated("2");
      fixtures.givenStoryTexthasBeenGenerated(mobyDickText);

      await fixtures.whenCreateStory();

      fixtures.ThenCatalogShouldBe([mobyDickStory]);
    });

    it("Catalog should contain 'Snow white' and 'red riding hood'", async () => {
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
        .build();

      fixtures.givenIdIsGenerated("550e8400-e29b-41d4-a716-446655440001");
      fixtures.givenStoryTexthasBeenGenerated(redRidingHoodText);

      await fixtures.whenCreateStory();

      fixtures.ThenCatalogShouldBe([snowWhiteStory, redRidingHoodStory]);
    });

    it("Catalog should contain 'Snow white' with this id", async () => {
      const uuid = "550e8400-e29b-41d4-a716-446655440100";
      const snowWhiteText = StoryTextBuilder().build();
      const snowWhiteStory = StoryBuilder().withId(uuid).build();

      fixtures.givenTheCatalogOfStoriesIs([]);
      fixtures.givenStoryTexthasBeenGenerated(snowWhiteText);
      fixtures.givenIdIsGenerated(uuid);

      await fixtures.whenCreateStory();

      fixtures.ThenCatalogShouldBe([snowWhiteStory]);
    });

    it("Catalog should contain 'Snow white' with this audio", async () => {
      const uuid = "550e8400-e29b-41d4-a716-446655440123";
      const snowWhiteText = StoryTextBuilder().build();
      const snowWhiteStory = StoryBuilder().withAudio(`test/${uuid}`).build();

      fixtures.givenTheCatalogOfStoriesIs([]);
      fixtures.givenStoryTexthasBeenGenerated(snowWhiteText);
      fixtures.givenAudioHasBeenStockedHere(`test/${uuid}`);

      await fixtures.whenCreateStory();

      fixtures.ThenCatalogShouldBe([snowWhiteStory]);
    });

    it("Catalog should contain 'Snow white' with these images", async () => {
      const id = "550e8400-e29b-41d4-a716-446655440124";
      const images = [`/t/${id}-1`, `/t/${id}-2`, `/t/${id}-3`, `/t/${id}-4`];
      const snowWhiteText = StoryTextBuilder().build();
      const snowWhiteStory = StoryBuilder()
        .withId(id)
        .withImages(images)
        .build();

      fixtures.givenIdIsGenerated(id);
      fixtures.givenTheCatalogOfStoriesIs([]);
      fixtures.givenStoryTexthasBeenGenerated(snowWhiteText);
      fixtures.givenImagesHasStockedHere(`/t`);

      await fixtures.whenCreateStory();

      fixtures.ThenCatalogShouldBe([snowWhiteStory]);
    });
  });
});
