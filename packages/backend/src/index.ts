import { FileSystemAudioRepository } from "./adapters/FileSystemAudioRepository";
import { FileSystemCatalogRepository } from "./adapters/FileSystemCatalogRepository";
import { FileSystemImageRepository } from "./adapters/FileSystemImageRepository";
import { OpenAiImageGenerator } from "./adapters/OpenAiImageGenerator";
import { OpenAiTextGenerator } from "./adapters/OpenAiTextGenerator";
import { OpenAiVoiceGenerator } from "./adapters/OpenAiVoiceGenerator";
import { UniqidIdGenerator } from "./adapters/UniqidIdGenerator";
import {
  CreateStoryUseCase,
  CreateStoryUseCaseConfig,
} from "./useCases/commands/CreateStory";

const rootDir = "./inMemory";
const fsCatalogFilename = rootDir + "/catalog.json";
const fsAudioPath = rootDir + "/audio";
const fsImagePath = rootDir + "/image";

const idGenerator = new UniqidIdGenerator();
const catalogRepository = new FileSystemCatalogRepository(fsCatalogFilename);
const storyGenerator = new OpenAiTextGenerator();
const voiceGenerator = new OpenAiVoiceGenerator();
const fileAudioRepository = new FileSystemAudioRepository(fsAudioPath);
const fileImageRepository = new FileSystemImageRepository(fsImagePath);
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
