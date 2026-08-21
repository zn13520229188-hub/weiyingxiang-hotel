"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type FaqItem = { id: string; question: string; answer: string };

type Props = {
  items: FaqItem[];
  title?: string;
  kicker?: string;
};

/** FAQ 手风琴 —— GEO 结构化数据的可视化呈现 */
export default function FaqList({ items, title, kicker }: Props) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="mx-auto w-full max-w-3xl">
      {(title || kicker) && (
        <div className="mb-10 text-center">
          {kicker && <span className="kicker">{kicker}</span>}
          {title && (
            <h2 className="mt-4 font-serif text-3xl text-ink sm:text-4xl">{title}</h2>
          )}
        </div>
      )}
      <div className="divide-y divide-line border-y border-line">
        {items.map((item) => {
          const open = openId === item.id;
          return (
            <div key={item.id}>
              <button
                type="button"
                id={`faq-q-${item.id}`}
                onClick={() => setOpenId(open ? null : item.id)}
                className="flex w-full items-center justify-between gap-6 px-2 py-6 text-left transition-colors hover:text-wood"
                aria-expanded={open}
                aria-controls={`faq-a-${item.id}`}
              >
                <span className="font-serif text-lg leading-snug text-ink sm:text-xl">
                  {item.question}
                </span>
                <motion.span
                  animate={{ rotate: open ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="shrink-0 font-serif text-2xl text-wood"
                  aria-hidden
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p
                      id={`faq-a-${item.id}`}
                      role="region"
                      aria-labelledby={`faq-q-${item.id}`}
                      className="px-2 pb-6 text-[15px] leading-relaxed text-body"
                    >
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
