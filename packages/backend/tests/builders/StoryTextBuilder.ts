import { TextStory } from "../../src/domain/entities/TextStory";

export const StoryTextBuilder = ({
  id = 1,
  title = "Snow White",
  text = "Once upon a time ...",
}: Partial<TextStory> = {}) => {
  const props = { id, title, text };
  return {
    withId(_id: typeof id) {
      return StoryTextBuilder({ ...props, id: _id });
    },
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
