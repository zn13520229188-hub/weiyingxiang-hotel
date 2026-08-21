"use client";

import { useEffect } from "react";

/**
 * 根路径 → 默认中文首页。
 * 静态导出不支持服务端 redirect()，改用客户端跳转；
 * 路径前缀跟随 NEXT_PUBLIC_BASE_PATH（构建时注入）。
 */
export default function RootPage() {
  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
    window.location.replace(`${base}/zh`);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-cream">
      <p className="font-serif text-lg tracking-[0.3em] text-body">蔚印象</p>
      <p className="mt-3 text-xs tracking-[0.25em] text-mute">正在进入…</p>
    </main>
  );
}
