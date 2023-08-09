import { JTDDataType } from "ajv/dist/core";

const inferenceResponseSchema = {
  type: "object",
  properties: {
    converted_image: { type: "string" },
    prompt: { type: "string" },
  },
} as const;

export type InferenceResponse = JTDDataType<typeof inferenceResponseSchema>;

export type InferenceCreate = {
  prompt: string;
  strength: number;
  image: string;
  is_mock?: boolean;
};
