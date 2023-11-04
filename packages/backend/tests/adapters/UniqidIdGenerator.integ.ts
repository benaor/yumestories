import { UniqidIdGenerator } from "../../src/adapters/UniqidIdGenerator";

jest.mock("uniqid", () => () => "uniqidToken12345");

const idGenerator = new UniqidIdGenerator();

beforeEach(() => {
  jest.clearAllMocks();
});

describe("UniqidIdGenerator", () => {
  it("should generate uniqid type string", () => {
    const id = idGenerator.generate();
    expect(typeof id).toBe("string");
  });

  it("should return 'uniqidToken12345'", () => {
    jest.mock("uniqid", () => () => "uniqidToken12345");

    const id = idGenerator.generate();
    expect(id).toBe("uniqidToken12345");
  });
});
