import { TextStory } from "../../src/domain/entities/TextStory";

describe("TextStory", () => {
  const title = "Snow White";
  const text = "Once upon a time ...";

  const story = new TextStory({ title, text });

  it("Should have a title", () => {
    expect(story.title).toEqual(title);
  });

  it("Should have a text", () => {
    expect(story.text).toEqual(text);
  });
});
