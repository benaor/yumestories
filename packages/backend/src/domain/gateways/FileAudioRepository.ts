export interface FileAudioRepository {
  save(file: Buffer): Promise<string>;
}
