import { JTDDataType } from "ajv/dist/core";

const gcsResponseSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    url: { type: "string" },
  },
} as const;

export type GcsResponse = JTDDataType<typeof gcsResponseSchema>;

const gcsBase64ResponseSchema = {
  type: "object",
  properties: {
    base64: { type: "string" },
    id: { type: "string" },
    url: { type: "string" },
  },
} as const;

export type GcsBase64Response = JTDDataType<typeof gcsBase64ResponseSchema>;

export type GcsCreate = {
  base64: string;
};
