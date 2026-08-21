"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { Dict, Locale } from "@/lib/i18n";
import site from "@/data/site.json";

type Props = { locale: Locale; dict: Dict };

/**
 * 全屏 Hero —— 「城市逃离」章节的开场
 * 三段式入场（像酒店宣传片开场）：
 * 1. 背景 2.4s 缓慢放大（呼吸感）
 * 2. 主标题字距从 0.35em 收敛（克制的高级感）
 * 3. 副题与滚动提示依次浮现
 */
export default function Hero({ locale, dict }: Props) {
  const reduce = useReducedMotion();
  const L = (v: { zh: string; en: string }) => v[locale];

  return (
    <section className="relative flex h-[100svh] min-h-[560px] items-center justify-center overflow-hidden">
      {/* 背景图：缓慢放大入场 */}
      <motion.div
        initial={reduce ? undefined : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <Image
          src={site.images.hero}
          alt={L(site.name)}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      {/* 深色压光 + 底部渐变，保证白字可读 */}
      <div className="absolute inset-0 bg-ink/45" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink/50" />

      {/* 中央文字 */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.p
          initial={reduce ? undefined : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="kicker text-cream/80"
        >
          {L(site.tagline)}
        </motion.p>

        <motion.h1
          initial={reduce ? undefined : { opacity: 0, letterSpacing: "0.35em" }}
          animate={{ opacity: 1, letterSpacing: "0.14em" }}
          transition={{ duration: 1.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 font-serif text-4xl text-cream sm:text-6xl md:text-7xl"
        >
          {dict.hero.title1}
        </motion.h1>

        <motion.p
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-md text-sm leading-relaxed text-cream/85 sm:text-base"
        >
          {dict.hero.subtitle}
        </motion.p>

        {/* AI 时代徽记 —— 克制的小字 */}
        <motion.span
          initial={reduce ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-12 rounded-full border border-cream/25 px-5 py-2 text-[11px] tracking-[0.3em] text-cream/70"
        >
          ✦ {dict.hero.badge}
        </motion.span>
        {/* AI 时代徽记 —— 克制的小字 */}
      </div>

      {/* 滚动提示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        aria-hidden
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, 9, 0] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.4em] text-cream/70">
            {dict.common.scroll}
          </span>
          <span className="block h-10 w-px bg-gradient-to-b from-cream/70 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
