import Ajv, { AnySchema } from "ajv";

import { Result } from "./types";
import { JTDDataType } from "ajv/dist/core";

export type ResponseError = {
  status: number;
  message: string;
};

const ajv = new Ajv({
  allErrors: false,
  strict: false,
});

const resp2result = async <T extends AnySchema>(
  resp: Response
): Promise<Result<T, ResponseError>> => {
  try {
    const data = (await resp.json()) as T;
    const validate = ajv.compile<JTDDataType<T>>(data);
    if (!resp.ok) {
      return {
        type: "error",
        error: {
          status: resp.status,
          message: resp.statusText,
        },
      };
    } else if (!validate(data)) {
      return {
        type: "error",
        error: {
          status: resp.status,
          message: JSON.stringify(validate.errors),
        },
      };
    }
    return { type: "ok", value: data };
  } catch (e) {
    return {
      type: "error",
      error: {
        status: 500,
        message: "Internal Server Error",
      },
    };
  }
};

export const apiClient = {
  get: async <T extends AnySchema>(url: string) => {
    const data = await fetch(url, {
      method: "GET",
    });
    return await resp2result<T>(data);
  },
  post: async <T extends AnySchema>(
    url: string,
    body: Record<string, unknown> | Record<string, unknown>[]
  ) => {
    const data = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return await resp2result<T>(data);
  },
};
