import { TextStory } from "../../src/domain/entities/TextStory";

export const StoryTextBuilder = ({
  title = "Snow White",
  text = "Once upon a time ...",
}: Partial<TextStory> = {}) => {
  const props = { title, text };
  return {
    withTitle(_title: typeof title) {
      return StoryTextBuilder({ ...props, title: _title });
    },
    withTextStory(_text: typeof text) {
      return StoryTextBuilder({ ...props, text: _text });
    },
    build(): TextStory {
      return props;
    },
  };
};
