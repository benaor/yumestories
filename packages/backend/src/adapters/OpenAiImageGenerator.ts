import { StoryImageGenerator } from "../domain/gateways/StoryImageGenerator";
import fetch from "node-fetch";
import "dotenv/config";

export class OpenAiImageGenerator implements StoryImageGenerator {
  private readonly apiUrl = String(process.env.OPENAI_IMAGE_GENERATOR_URL);
  private readonly model = "dall-e-3";

  async generate(text: string, count: number): Promise<Buffer[]> {
    const promiseArray = [];
    for (let i = 0; i < count; i++) {
      promiseArray.push(this.generateImage(text));
    }
    const images = await Promise.all(promiseArray);
    return images;
  }

  private async generateImage(text: string): Promise<Buffer> {
    const headers = this.createHeader();
    const body = this.createBody(text);
    const method = "POST";

    const res = await fetch(this.apiUrl, { method, headers, body });
    const { data } = await res.json();
    const image = data[0].b64_json;

    return Buffer.from(image, "base64");
  }

  private createHeader() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    };
  }

  private createBody(_input: string, count?: number) {
    return JSON.stringify({
      model: this.model,
      response_format: "b64_json",
      prompt:
        "Genere moi une illustration de cette bedtime story (sans texte sur l'image) dans un style féérique et merveilleux, sans jamais afficher le moindre texte sur l'illustration. L'image est a destination d'un enfant de 4 ans qui ne sait pas lire, donc pas de texte ni lettre sur l'image: " +
        _input,
      n: count || 1,
      size: "1024x1024",
    });
  }
}
