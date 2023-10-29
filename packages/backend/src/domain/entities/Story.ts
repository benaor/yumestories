export class Story {
  id: number;
  textStory: string;
  title: string;
  audio: string;

  constructor({ id, textStory, title, audio }: Story) {
    this.id = id;
    this.textStory = textStory;
    this.title = title;
    this.audio = audio;
  }
}
