import { Story } from "../../src/domain/entities/Story";

export const StoryBuilder = ({
  id = 1,
  title = "Snow White",
  text = "Once upon a time ...",
  audio = "http://localhost:3000/audio/1",
}: Partial<Story> = {}) => {
  const props = { id, title, text, audio };
  return {
    withId(_id: typeof id) {
      return StoryBuilder({ ...props, id: _id });
    },
    withTitle(_title: typeof title) {
      return StoryBuilder({ ...props, title: _title });
    },
    withTextStory(_text: typeof text) {
      return StoryBuilder({ ...props, text: _text });
    },
    withAudio(_audio: typeof audio) {
      return StoryBuilder({ ...props, audio: _audio });
    },
    build(): Story {
      return props;
    },
  };
};
