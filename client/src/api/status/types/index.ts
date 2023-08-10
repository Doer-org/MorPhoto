import { JTDDataType } from "ajv/dist/core";

const statusResponseBaseSchema = {
  type: "object",
  properties: {
    parent_id: { type: "string" },
    is_done: { type: "boolean" },
    view_count: { type: "int32" },
    created_at: { type: "string" },
  },
} as const;

const statusResponseSchema = {
  type: "object",
  properties: {
    data: statusResponseBaseSchema,
  },
} as const;

export type StatusResponse = JTDDataType<typeof statusResponseSchema>;
