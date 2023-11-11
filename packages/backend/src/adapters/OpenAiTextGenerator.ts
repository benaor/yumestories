import { TextStory } from "../domain/entities/TextStory";
import { StoryTextGenerator } from "../domain/gateways/StoryTextGenerator";
import "dotenv/config";
import fetch from "node-fetch";

export class OpenAiTextGenerator implements StoryTextGenerator {
  private readonly apiUrl = String(process.env.OPENAI_CHAT_COMPLETIONS_URL);
  private readonly model = "gpt-3.5-turbo-1106";
  private readonly prompt = `Ecris moi une histoire pour mon enfant de 4 ans`;
  private readonly system = `Tu es un ecrivain. Tu réalises des histoires fantastiques pour les enfants. 
  Chacune de tes histoires doit aider l'enfant à comprendre une notion important de son éducation : Politesse, sentiments, altruisme etc.
  La réponse devra être au format JSON sous cette forme: { title: string, text: string }`;

  async generate(): Promise<TextStory> {
    const story = await this.askStoryToOpenAi();
    return story;
  }

  async askStoryToOpenAi(): Promise<TextStory> {
    const headers = this.createHeader();
    const body = this.createBody();
    const method = "POST";

    const res = await fetch(this.apiUrl, { method, headers, body });
    const story = await res.json();

    return story.choices[0].message.content;
  }

  private createHeader() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    };
  }

  private createBody() {
    return JSON.stringify({
      model: this.model,
      messages: [
        {
          role: "system",
          content: this.system,
        },
        {
          role: "user",
          content: this.prompt,
        },
      ],
      response_format: { type: "json_object" },
    });
  }
}
