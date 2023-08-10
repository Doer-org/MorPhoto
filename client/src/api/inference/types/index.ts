import { JTDDataType } from "ajv/dist/core";

const inferenceResponseSchema = {
  type: "object",
  properties: {
    parent_id: { type: "string" },
    child_id: { type: "string" },
    prompt: { type: "string" },
    strength: { type: "float32" },
  },
} as const;

export type InferenceResponse = JTDDataType<typeof inferenceResponseSchema>;

export type InferenceCreate = {
  prompt: string;
  strength: number;
  is_mock?: boolean;
};
