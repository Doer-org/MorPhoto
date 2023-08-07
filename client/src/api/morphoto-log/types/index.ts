import { JTDDataType } from "ajv/dist/core";

const morphotoLogResponseBaseSchema = {
  type: "object",
  properties: {
    morphoto_id: { type: "string" },
    view_count: { type: "integer" },
    created_at: { type: "string" },
  },
} as const;

const morphotoLogResponseSchema = {
  type: "object",
  properties: {
    data: morphotoLogResponseBaseSchema,
  },
} as const;

export type MorphotoLogResponse = JTDDataType<typeof morphotoLogResponseSchema>;
