import { Story } from "../../src/domain/entities/Story";

export const StoryBuilder = ({
  id = 1,
  title = "Snow White",
  textStory = "Once upon a time ...",
  audio = "http://localhost:3000/audio/",
}: Partial<Story> = {}) => {
  const props = { id, title, textStory, audio };
  return {
    withId(_id: typeof id) {
      return StoryBuilder({ ...props, id: _id });
    },
    withTitle(_title: typeof title) {
      return StoryBuilder({ ...props, title: _title });
    },
    withTextStory(_textStory: typeof textStory) {
      return StoryBuilder({ ...props, textStory: _textStory });
    },
    withAudio(_audio: typeof audio) {
      return StoryBuilder({ ...props, audio: _audio });
    },
    build(): Story {
      return props;
    },
  };
};
