import { JTDDataType } from "ajv/dist/core";

const morphotoResponseBaseSchema = {
  type: "object",
  properties: {
    parent_id: { type: "string" },
    child_id: { type: "string" },
    prompt: { type: "string" },
    strength: { type: "float32" },
  },
} as const;

const morphotoResponseSchema = {
  type: "object",
  properties: {
    data: morphotoResponseBaseSchema,
  },
} as const;

export type MorphotoResponse = JTDDataType<typeof morphotoResponseSchema>;

const morphotosResponseSchema = {
  type: "object",
  properties: {
    data: {
      elements: morphotoResponseBaseSchema,
    },
  },
} as const;

export type MorphotosResponse = JTDDataType<typeof morphotosResponseSchema>;

type MorphotoBase = {
  parent_id: string;
  child_id: string;
  prompt: string;
  strength: number;
};

export type MorphotoCreate = MorphotoBase;
