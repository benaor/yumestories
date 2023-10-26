import { Story } from "../domain/entities/Story";

export class CreateStoryCommand {
  execute(): Story {
    return { id: 1, textStory: "Once upon a time ..." };
  }
}
