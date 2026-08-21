import type { MetadataRoute } from "next";
import site from "@/data/site.json";

/** 静态导出要求显式声明 */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.siteUrl}/sitemap.xml`,
  };
}
