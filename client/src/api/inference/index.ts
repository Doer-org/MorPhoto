import { env } from "@/constants";
import { apiClient } from "../core";
import { InferenceCreate, InferenceResponse } from "./types";

export const createInference = async (id: string, inference: InferenceCreate) =>
  await apiClient.post<InferenceResponse>(
    `${env.SERVER_URL}/inference/${id}`,
    inference
  );
