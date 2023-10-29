export interface StoryVoiceGenerator {
  generate(text: string): Promise<string>;
}
