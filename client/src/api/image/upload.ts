import { SignedPostPolicyV4Output } from "@google-cloud/storage";
import { v4 as uuidv4 } from "uuid";

export const uploadImage = async (file: File) => {
  const fileName = uuidv4();
  const res = await fetch(`/api/image?file=${fileName}`, { method: "POST" });
  console.log(res);
  const { url, fields }: SignedPostPolicyV4Output = await res.json();
  const body = new FormData();
  Object.entries({ ...fields, file }).forEach(([key, value]) => {
    body.append(key, value as string | Blob);
  });
  const upload = await fetch(url, { method: "POST", body });
  if (!upload.ok) {
    console.log("upload failed");
    return "";
  }
  // return { fileName, url, fields };
  return { fileName };
};
