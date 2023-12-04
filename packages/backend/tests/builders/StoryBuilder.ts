import { Story } from "../../src/domain/entities/Story";

export const StoryBuilder = ({
  id = "550e8400-e29b-41d4-a716-446655440000",
  title = "Snow White",
  text = "Once upon a time ...",
  audio = "",
  images = [],
}: Partial<Story> = {}) => {
  const props = { id, title, text, audio, images };
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
    withImages(_images: typeof images) {
      return StoryBuilder({ ...props, images: _images });
    },
    build(): Story {
      if (!audio) {
        return StoryBuilder({
          ...props,
          audio: `/${id}`,
        }).build();
      }
      if (images.length === 0) {
        return StoryBuilder({
          ...props,
          images: [`/${id}-1`, `/${id}-2`, `/${id}-3`, `/${id}-4`],
        }).build();
      }
      return props;
    },
  };
};
