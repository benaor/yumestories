export class TextStory {
  id: number;
  title: string;
  textStory: string;

  constructor({ id, title, textStory }: TextStory) {
    this.id = id;
    this.title = title;
    this.textStory = textStory;
  }
}
