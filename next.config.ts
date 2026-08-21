import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* GitHub Pages 静态导出：
     - output: "export" 生成纯静态站点
     - basePath 对应仓库名子路径（https://zn13520229188-hub.github.io/weiyingxiang-hotel/）
     - trailingSlash 适配 GitHub Pages 目录寻址 */
  output: "export",
  basePath: "/weiyingxiang-hotel",
  trailingSlash: true,
  images: {
    // 静态导出必须用 custom loader（官方约定）：
    // loader 会给本地图片 src 补 basePath 前缀，否则子路径部署图片 404
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
  },
};

export default nextConfig;
