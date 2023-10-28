import { Story } from "../entities/Story";

export interface CatalogRepository {
  addStoryInCatalog(story: Story): Promise<void>;
}
