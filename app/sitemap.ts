import type { MetadataRoute } from "next";
import site from "@/data/site.json";

/** 站点地图 —— 全量 zh/en 页面，标注双语 alternate（GEO 友好） */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.siteUrl;
  const pages = ["", "/hotel", "/rooms", "/experience", "/explore", "/contact"];

  const lastModified = new Date("2026-08-21");

  return ["zh", "en"].flatMap((locale) =>
    pages.map((path) => ({
      url: `${base}/${locale}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
      alternates: {
        languages: {
          "zh-CN": `${base}/zh${path}`,
          en: `${base}/en${path}`,
        },
      },
    })),
  );
}
