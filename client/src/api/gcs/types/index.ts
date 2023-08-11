import { JTDDataType } from "ajv/dist/core";

const gcsResponseBaseSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    url: { type: "string" },
  },
} as const;

const gcsResponseSchema = {
  type: "object",
  properties: {
    data: gcsResponseBaseSchema,
  },
} as const;

export type GcsResponse = JTDDataType<typeof gcsResponseSchema>;

export type GcsCreate = {
  base64: string;
};
