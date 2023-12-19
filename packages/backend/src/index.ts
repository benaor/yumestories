import { FileSystemCatalogRepository } from "./adapters/FileSystemCatalogRepository";
import { OpenAiTextGenerator } from "./adapters/OpenAiTextGenerator";
import { OpenAiVoiceGenerator } from "./adapters/OpenAiVoiceGenerator";
import { UniqidIdGenerator } from "./adapters/UniqidIdGenerator";
import {
  CreateStoryUseCase,
  CreateStoryUseCaseConfig,
} from "./useCases/commands/CreateStory";

const fsCatalogFilename = __dirname + "/../inMemory/catalog.json";

const idGenerator = new UniqidIdGenerator();
const catalogRepository = new FileSystemCatalogRepository(fsCatalogFilename);
const storyGenerator = new OpenAiTextGenerator();
const voiceGenerator = new OpenAiVoiceGenerator();
const fileAudioRepository = new InMemoryFileAudioRepository();
const fileImageRepository = new InMemoryFileImageRepository();
const imageGenerator = new OpenAiImageGenerator();

const createStoryConfig: CreateStoryUseCaseConfig = {
  idGenerator,
  catalogRepository,
  storyGenerator,
  voiceGenerator,
  fileAudioRepository,
  fileImageRepository,
  imageGenerator,
};

const creator = new CreateStoryUseCase(createStoryConfig);

creator.execute();
