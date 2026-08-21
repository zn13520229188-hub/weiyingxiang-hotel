/**
 * 本地图片 loader —— 静态导出（GitHub Pages 子路径）专用。
 *
 * 背景：next/image 在 output: "export" 下必须使用 custom loader；
 * 且静态导出时 img 的 src 不会自动带 basePath 前缀，
 * 必须在这里手动补上，否则线上图片全部 404。
 *
 * 注意：basePath 与 next.config.ts 保持一致；
 * 更换部署子路径（如腾讯云 /hotel）时同步修改此处。
 */
export default function localImageLoader({
  src,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  return `/weiyingxiang-hotel${src}`;
}
