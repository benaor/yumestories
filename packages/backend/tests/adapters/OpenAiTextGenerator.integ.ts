import { OpenAiTextGenerator } from "../../src/adapters/OpenAiTextGenerator";
import { TextStory } from "../../src/domain/entities/TextStory";
import { StoryTextGenerator } from "../../src/domain/gateways/StoryTextGenerator";
import { server } from "../mocks/server";
import { mockOpenAiStoryResponse } from "../mocks/handlers/openAiHandlers";

describe("OpenAiTextGenerator", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should return a TextStory which contains 'The first witcher'", async () => {
    givenOpenAiReturnThisStory({
      title: "The first witcher",
      text: "In a wonderful world, there was a witcher.",
    });

    const generator: StoryTextGenerator = new OpenAiTextGenerator();
    const { text, title }: TextStory = await generator.generate();

    expect(title).toEqual("The first witcher");
    expect(text).toEqual("In a wonderful world, there was a witcher.");
  });

  it("should return a TextStory which contains 'Leo little rabbit'", async () => {
    givenOpenAiReturnThisStory({
      title: "Leo little rabbit",
      text: "Once upon a times, a little rabbit nammed Leo ...",
    });

    const generator: StoryTextGenerator = new OpenAiTextGenerator();
    const { text, title }: TextStory = await generator.generate();

    expect(title).toEqual("Leo little rabbit");
    expect(text).toEqual("Once upon a times, a little rabbit nammed Leo ...");
  });
});

function givenOpenAiReturnThisStory(_story: { title: string; text: string }) {
  server.use(mockOpenAiStoryResponse(_story));
}
