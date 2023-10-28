export class Story {
  id: number;
  textStory: string;
  title: string;

  constructor({ id, textStory, title }: Story) {
    this.id = id;
    this.textStory = textStory;
    this.title = title;
  }
}
