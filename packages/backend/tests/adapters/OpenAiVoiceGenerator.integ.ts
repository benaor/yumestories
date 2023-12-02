import { OpenAiVoiceGenerator } from "../../src/adapters/OpenAiVoiceGenerator";
import { mockOpenAiVoiceResponse } from "../mocks/handlers/openAiHandlers";
import { server } from "../mocks/server";

describe("OpenAiVoiceGenerator", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("Should return a buffer", async () => {
    givenOpenAiReturnThisvoice();

    const voiceGenerator = new OpenAiVoiceGenerator();
    const voice = await voiceGenerator.generate("Once upon a time ...");

    expect(voice).toBeInstanceOf(Buffer);
  });
});

function givenOpenAiReturnThisvoice() {
  server.use(mockOpenAiVoiceResponse());
}
