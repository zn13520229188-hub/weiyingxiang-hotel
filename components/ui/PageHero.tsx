"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

type Props = {
  image: string;
  kicker?: string;
  title: string;
  /** 可选副文 */
  intro?: string;
};

/**
 * 子页面统一 Hero —— 深色图 + 标题渐入。
 * 标题克制地上移浮现，与首页 Hero 节奏一致。
 */
export default function PageHero({ image, kicker, title, intro }: Props) {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex h-[58vh] min-h-[420px] items-end overflow-hidden">
      <motion.div
        initial={reduce ? undefined : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <Image src={image} alt={title} fill priority sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-ink/50" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-ink/60" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 lg:px-10">
        {kicker && (
          <motion.p
            initial={reduce ? undefined : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="kicker text-cream/75"
          >
            {kicker}
          </motion.p>
        )}
        <motion.h1
          initial={reduce ? undefined : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 font-serif text-4xl tracking-[0.12em] text-cream sm:text-5xl md:text-6xl"
        >
          {title}
        </motion.h1>
        {intro && (
          <motion.p
            initial={reduce ? undefined : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-lg text-[15px] leading-relaxed text-cream/85"
          >
            {intro}
          </motion.p>
        )}
      </div>
    </section>
  );
}
