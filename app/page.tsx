"use client";

import { useEffect } from "react";

/**
 * 根路径 → 默认中文首页。
 * 静态导出不支持服务端 redirect()，改用客户端跳转；
 * URL 需含 basePath（GitHub Pages 仓库子路径）。
 */
export default function RootPage() {
  useEffect(() => {
    window.location.replace("/weiyingxiang-hotel/zh");
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-cream">
      <p className="font-serif text-lg tracking-[0.3em] text-body">蔚印象</p>
      <p className="mt-3 text-xs tracking-[0.25em] text-mute">正在进入…</p>
    </main>
  );
}
