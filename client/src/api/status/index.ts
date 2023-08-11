import { env } from "@/constants";
import { apiClient } from "../core";
import { StatusResponse } from "./types";

export const readStatus = async (id: string) =>
  await apiClient.get<StatusResponse>(`${env.SERVER_URL}/status/${id}`);
