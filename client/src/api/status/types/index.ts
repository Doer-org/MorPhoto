import { JTDDataType } from "ajv/dist/core";

const statusResponseSchema = {
  type: "object",
  properties: {
    parent_id: { type: "string" },
    is_done: { type: "boolean" },
    view_count: { type: "int32" },
    created_at: { type: "string" },
  },
} as const;

export type StatusResponse = JTDDataType<typeof statusResponseSchema>;
