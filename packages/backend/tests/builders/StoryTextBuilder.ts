import { TextStory } from "../../src/domain/entities/TextStory";

export const StoryTextBuilder = ({
  id = 1,
  title = "Snow White",
  textStory = "Once upon a time ...",
}: Partial<TextStory> = {}) => {
  const props = { id, title, textStory };
  return {
    withId(_id: typeof id) {
      return StoryTextBuilder({ ...props, id: _id });
    },
    withTitle(_title: typeof title) {
      return StoryTextBuilder({ ...props, title: _title });
    },
    withTextStory(_textStory: typeof textStory) {
      return StoryTextBuilder({ ...props, textStory: _textStory });
    },
    build(): TextStory {
      return props;
    },
  };
};
