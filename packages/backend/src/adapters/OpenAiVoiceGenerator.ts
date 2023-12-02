import { StoryVoiceGenerator } from "../domain/gateways/StoryVoiceGenerator";
import "dotenv/config";

export class OpenAiVoiceGenerator implements StoryVoiceGenerator {
  private readonly apiUrl = String(process.env.OPENAI_TEXT_TO_SPEECH_URL);
  private readonly model = "tts-1";
  private readonly voice = "alloy";

  async generate(text: string): Promise<Buffer> {
    const voice = await this.askSpeechToOpenAi(text);
    return voice;
  }

  async askSpeechToOpenAi(input: string): Promise<Buffer> {
    const headers = this.createHeader();
    const body = this.createBody(input);
    const method = "POST";

    const res = await fetch(this.apiUrl, { method, headers, body });
    const voice = await res.arrayBuffer();

    return Buffer.from(voice);
  }

  private createHeader() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    };
  }

  private createBody(_input: string) {
    return JSON.stringify({
      model: this.model,
      voice: this.voice,
      input: _input,
    });
  }
}
