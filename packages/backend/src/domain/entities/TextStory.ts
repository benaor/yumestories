export class TextStory {
  id: number;
  title: string;
  text: string;

  constructor({ id, title, text }: TextStory) {
    this.id = id;
    this.title = title;
    this.text = text;
  }
}
