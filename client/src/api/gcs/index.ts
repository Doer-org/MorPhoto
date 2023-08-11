import { env } from "@/constants";
import { apiClient } from "../core";
import { GcsCreate, GcsResponse } from "./types";

export const readGcs = async (id: string) =>
  await apiClient.get<GcsResponse>(`${env.SERVER_URL}/gcs/${id}`);

export const createGcs = async (gcs: GcsCreate) =>
  await apiClient.post<GcsResponse>(`${env.SERVER_URL}/gcs`, gcs);
