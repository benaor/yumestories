export interface StoryImageGenerator {
  generate(text: string, count: number): Promise<Buffer[]>;
}
