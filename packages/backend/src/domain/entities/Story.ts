export class Story {
  id: string;
  text: string;
  title: string;
  audio: string;
  images: Array<string>;

  constructor({ id, text, title, audio, images }: Story) {
    this.id = id;
    this.text = text;
    this.title = title;
    this.audio = audio;
    this.images = images;
  }
}
