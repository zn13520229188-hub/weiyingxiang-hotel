"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  /** 容器类：需自带高度（如 aspect-[4/5]）与 overflow-hidden 效果由内部处理 */
  className?: string;
  imgClassName?: string;
  priority?: boolean;
};

/**
 * 视差图 —— 滚动时图片以约 90% 速度缓移，形成空间纵深。
 * 外层容器需给定高度；图片内边留 8% 余量避免露出边缘。
 */
export default function ParallaxImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  priority,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={reduce ? undefined : { y }}
        className="absolute inset-[-8%]"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 60vw"
          className={`object-cover ${imgClassName}`}
        />
      </motion.div>
    </div>
  );
}
