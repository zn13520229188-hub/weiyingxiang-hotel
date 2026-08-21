/**
 * 本地图片 loader —— 静态导出专用。
 *
 * 背景：next/image 在 output: "export" 下必须使用 custom loader；
 * 且静态导出时 img 的 src 不会自动带 basePath 前缀，必须手动补上。
 *
 * basePath 来源：构建时环境变量 NEXT_PUBLIC_BASE_PATH（与 next.config.ts 一致）：
 *   - GitHub Pages 子路径部署：/weiyingxiang-hotel
 *   - EdgeOne Pages / 本地 dev：空（根路径）
 */
export default function localImageLoader({
  src,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return `${base}${src}`;
}
