import { env } from "@/constants";
import { apiClient } from "../core";
import { GcsBase64Response, GcsCreate, GcsResponse } from "./types";

export const readGcsBase64 = async (id: string) =>
  await apiClient.get<GcsBase64Response>(`${env.SERVER_URL}/gcs/${id}`);

export const createGcs = async (gcs: GcsCreate) =>
  await apiClient.post<GcsResponse>(`${env.SERVER_URL}/gcs`, gcs);
