import { Pool } from "pg";
import { Story } from "../domain/entities/Story";
import { CatalogRepository } from "../domain/gateways/CatalogRepository";

export class PostgreSqlCatalogRepository implements CatalogRepository {
  constructor(private pgClient: Pool) {}

  async addStoryInCatalog(story: Story): Promise<void> {
    await this.pgClient
      .query(`INSERT INTO stories (id, text, title, audio) VALUES 
      ('${story.id}', '${story.text}', '${story.title}', '${story.audio}');`);
  }
}
