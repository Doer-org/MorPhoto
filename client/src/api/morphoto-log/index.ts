import { env } from "@/constants";
import { apiClient } from "../core";
import { MorphotoLogResponse } from "./types";

export const readMorphotoLog = async (morphoto_id: string) =>
  await apiClient.get<MorphotoLogResponse>(
    `${env.SERVER_URL}/log/${morphoto_id}`
  );
