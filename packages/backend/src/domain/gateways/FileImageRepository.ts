export interface FileImageRepository {
  save(file: Buffer, filename: string): Promise<string>;
}
