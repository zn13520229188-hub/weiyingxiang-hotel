import type { NextConfig } from "next";

/**
 * basePath 由环境变量 NEXT_PUBLIC_BASE_PATH 控制，自动适配部署位置：
 *   - GitHub Pages 子路径：构建时设 NEXT_PUBLIC_BASE_PATH=/weiyingxiang-hotel
 *   - EdgeOne Pages / 本地 dev（根路径）：不设置即为空
 */
const nextConfig: NextConfig = {
  /* 静态导出（纯静态站点，可部署到任意静态托管） */
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  trailingSlash: true,
  images: {
    // 静态导出必须用 custom loader（官方约定）：
    // loader 会给本地图片 src 补 basePath 前缀，否则子路径部署图片 404
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
  },
};

export default nextConfig;
