import { readFile } from "fs/promises";
import path from "path";
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";
import { Pool } from "pg";
import "dotenv/config";
import { PostgreSqlCatalogRepository } from "../../src/adapters/PostgreSqlCatalogRepository";
import { StoryBuilder } from "../builders/StoryBuilder";

const username = "username";
const password = "password";
const database = "yumestories";

describe("PostgreCatalogRepository", () => {
  let container: StartedPostgreSqlContainer;
  let pgClient: Pool;

  beforeEach(async () => {
    container = await new PostgreSqlContainer()
      .withDatabase(database)
      .withUsername(username)
      .withPassword(password)
      .withExposedPorts(5432)
      .start();

    const config = {
      host: container.getHost(),
      port: container.getMappedPort(5432),
      user: username,
      password: password,
      database: database,
    };

    pgClient = new Pool(config);

    const CreateTableQuery = await readFile(
      path.join(__dirname, "../../database/stories.sql"),
      "utf8",
    );
    await pgClient.query(CreateTableQuery);
  });

  afterEach(async () => {
    container.stop({ timeout: 20000 });
    return pgClient.end();
  });

  it("Should stock a story in database", async () => {
    const story = StoryBuilder().build();
    let catalog = await pgClient.query("SELECT * FROM stories");
    expect(catalog.rows).toEqual([]);

    const catalogRepository = new PostgreSqlCatalogRepository(pgClient);
    await catalogRepository.addStoryInCatalog(story);

    catalog = await pgClient.query("SELECT * FROM stories");
    expect(catalog.rows).toEqual([story]);
  });

  it("Should stock two story in database", async () => {
    const story1 = StoryBuilder()
      .withId("550e8400-e29b-41d4-a716-446655440000")
      .withTitle("Snow White")
      .withTextStory("Once upon a time ...")
      .withAudio(
        "http://localhost:3000/audio/550e8400-e29b-41d4-a716-446655440000",
      )
      .build();

    const story2 = StoryBuilder()
      .withId("550e8400-e29b-41d4-a716-446655440001")
      .withTitle("Snow White 2")
      .withTextStory("Once upon a time 2 ...")
      .withAudio(
        "http://localhost:3000/audio/550e8400-e29b-41d4-a716-446655440001",
      )
      .build();

    let catalog = await pgClient.query("SELECT * FROM stories");
    expect(catalog.rows).toEqual([]);

    const catalogRepository = new PostgreSqlCatalogRepository(pgClient);
    await catalogRepository.addStoryInCatalog(story1);
    await catalogRepository.addStoryInCatalog(story2);

    catalog = await pgClient.query("SELECT * FROM stories");
    expect(catalog.rows).toEqual([story1, story2]);
  });
});
