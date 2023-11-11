import { rest } from "msw";

export const mockOpenAiStoryResponse = (content: unknown) =>
  rest.post("https://api.openai.com/v1/chat/completions", (req, res, ctx) =>
    res(
      ctx.json({
        id: "chatcmpl-123",
        object: "chat.completion",
        created: 1677652288,
        model: "gpt-3.5-turbo-0613",
        system_fingerprint: "fp_44709d6fcb",
        choices: [
          {
            index: 0,
            message: {
              role: "assistant",
              content: content,
            },
            finish_reason: "stop",
          },
        ],
        usage: {
          prompt_tokens: 9,
          completion_tokens: 12,
          total_tokens: 21,
        },
      }),
    ),
  );

export const openAiHandlers = [];
