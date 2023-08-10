import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.morphoto.app",
      lastModified: new Date(),
    },
    {
      url: "https://www.morphoto.app/create",
      lastModified: new Date(),
    },
    {
      url: "https://www.morphoto.app/result/",
      lastModified: new Date(),
    },
  ];
}
