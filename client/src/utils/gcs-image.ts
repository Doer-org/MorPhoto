import { env } from "@/constants";
const { GCS_URL } = env;

export const getImageUrl = (fileName: string) => {
  return `${GCS_URL}/${fileName}`;
};
