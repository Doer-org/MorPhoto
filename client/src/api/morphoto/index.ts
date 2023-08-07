import { env } from "@/constants";
import { apiClient } from "../core";
import { MorphotoCreate, MorphotoResponse, MorphotosResponse } from "./types";

export const createMorphoto = async (morphoto: MorphotoCreate) =>
  await apiClient.post<MorphotoResponse>(
    `${env.SERVER_URL}/morphoto}`,
    morphoto
  );

export const readMorphoto = async (morphoto_id: string) =>
  await apiClient.get<MorphotoResponse>(
    `${env.SERVER_URL}/morphoto/${morphoto_id}`
  );

export const readAllMorphotos = async () =>
  await apiClient.get<MorphotosResponse>(`${env.SERVER_URL}/morphoto`);
