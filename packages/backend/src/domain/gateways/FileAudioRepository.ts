export interface FileAudioRepository {
  save(file: Buffer, filename: string): Promise<string>;
}
