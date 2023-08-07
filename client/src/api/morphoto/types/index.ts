import { JTDDataType } from "ajv/dist/core";

const morphotoResponseBaseSchema = {
  type: "object",
  properties: {
    morphoto_id: { type: "string" },
    img_url: { type: "string" },
  },
  optionalProperties: {
    parent_id: { type: "string" },
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
  morphoto_id: string;
  img_url: string;
  parent_id?: string;
};

export type MorphotoCreate = MorphotoBase;
