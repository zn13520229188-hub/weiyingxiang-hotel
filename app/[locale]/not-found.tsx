"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDictionary } from "@/lib/i18n";

/** 404 —— 按当前路径语言显示（/zh 中文、/en English），克制的空页 */
export default function LocaleNotFound() {
  const pathname = usePathname();
  const locale = pathname.startsWith("/en") ? "en" : "zh";
  const dict = getDictionary(locale);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 text-center">
      <p className="font-serif text-7xl text-line">404</p>
      <h1 className="mt-8 font-serif text-3xl tracking-[0.15em] text-ink">
        {dict.notFound.title}
      </h1>
      <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-body">
        {dict.notFound.body}
      </p>
      <Link
        href={`/${locale}`}
        className="mt-12 border-b border-wood pb-1 text-[13px] tracking-[0.25em] text-wood transition-colors duration-300 hover:border-ink hover:text-ink"
      >
        {dict.common.backHome}
      </Link>
    </main>
  );
}
