export class Story {
  id: string;
  text: string;
  title: string;
  audio: string;

  constructor({ id, text, title, audio }: Story) {
    this.id = id;
    this.text = text;
    this.title = title;
    this.audio = audio;
  }
}
