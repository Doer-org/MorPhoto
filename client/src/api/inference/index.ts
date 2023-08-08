import { env } from "@/constants";
import { apiClient } from "../core";
import { InferenceCreate, InferenceResponse } from "./types";

export const createInference = async (inference: InferenceCreate) =>
  await apiClient.post<InferenceResponse>(`${env.ML_URL}/inference`, inference);
