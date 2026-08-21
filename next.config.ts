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
    unoptimized: true, // 静态导出需要，否则 next/image 会请求图片优化服务
  },
};

export default nextConfig;
