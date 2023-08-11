import { env } from "@/constants";
import { apiClient } from "../core";
import { MorphotoResponse, MorphotosResponse } from "./types";

export const readMorphoto = async (parent_id: string) =>
  await apiClient.get<MorphotoResponse>(
    `${env.SERVER_URL}/morphoto/${parent_id}`
  );

export const readAllMorphotos = async () =>
  await apiClient.get<MorphotosResponse>(`${env.SERVER_URL}/morphoto/all`);
