export const env = {
  CLIENT_URL: process.env.NEXT_PUBLIC_CLIENT_URL || "",
  SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL || "",
  ML_URL: process.env.NEXT_PUBLIC_ML_URL || "",
  GCP_PROJECT_ID: process.env.GCP_PROJECT_ID || "",
  GCP_BUCKET_NAME: process.env.GCP_BUCKET_NAME || "",
  GCP_CREDENTIALS: process.env.GCP_CREDENTIALS || "",
  GCS_URL: "https://storage.googleapis.com/morphoto_strage",
};
