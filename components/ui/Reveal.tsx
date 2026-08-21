"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** 延迟（秒），用于层次出现 */
  delay?: number;
  /** 初始位移量 */
  y?: number;
  /** 是否只触发一次 */
  once?: boolean;
};

/**
 * 滚动浮现容器 —— 克制系动画核心：
 * 透明 → 可见，上移 40px → 原位，1s easeOut（类酒店宣传片节奏）
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 40,
  once = true,
}: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
