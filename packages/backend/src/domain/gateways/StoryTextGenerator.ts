import { TextStory } from "../entities/TextStory";

export interface StoryTextGenerator {
  generate(): Promise<TextStory>;
}
