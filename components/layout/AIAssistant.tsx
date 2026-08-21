"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { l, type Dict, type Locale } from "@/lib/i18n";
import assistant from "@/data/assistant.json";

type Props = { locale: Locale; dict: Dict };

/**
 * 「探索蔚印象」AI 酒店顾问（演示版）
 * - 右下角浮动按钮，展开轻量对话面板
 * - 三个预设主题：酒店介绍 / 入住建议 / 城市推荐
 * - 内容数据驱动（data/assistant.json），未来接入真实 AI 网关时只替换数据源
 */
export default function AIAssistant({ locale, dict }: Props) {
  const [open, setOpen] = useState(false);
  const [asked, setAsked] = useState<string | null>(null); // 已提问主题 id

  // Esc 关闭面板（无障碍）
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const answered = assistant.topics.find((t) => t.id === asked);

  return (
    <>
      {/* 浮动按钮 */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-6 right-6 z-50 flex h-14 items-center gap-2 rounded-full border border-line bg-ink px-5 text-sm tracking-[0.15em] text-cream shadow-lg shadow-ink/20 transition-transform duration-300 hover:scale-[1.03]"
        aria-expanded={open}
      >
        <span aria-hidden className="text-base">
          ✦
        </span>
        {dict.assistant.title}
      </motion.button>

      {/* 对话面板 */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-50 flex max-h-[min(560px,72vh)] w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl border border-line bg-cream shadow-2xl shadow-ink/20"
            role="dialog"
            aria-modal="true"
            aria-label={dict.assistant.title}
          >
            {/* 面板头 */}
            <div className="flex items-center justify-between border-b border-line bg-ink px-5 py-4">
              <div>
                <p className="font-serif text-base tracking-[0.2em] text-cream">
                  {dict.assistant.title}
                </p>
                <p className="mt-0.5 text-[11px] tracking-[0.15em] text-cream/60">
                  {dict.assistant.subtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-cream/60 transition-colors hover:text-cream"
                aria-label={dict.assistant.close}
              >
                <span className="font-serif text-2xl leading-none">×</span>
              </button>
            </div>

            {/* 对话区 */}
            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
              {/* AI 问候 */}
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-cream-deep px-4 py-3 text-[13px] leading-relaxed text-body">
                  {l(assistant.greeting, locale)}
                </div>
              </div>

              {/* 主题卡片（未选择时展示） */}
              {!answered && (
                <div className="grid gap-2 pt-1">
                  {assistant.topics.map((t) => (
                    <motion.button
                      key={t.id}
                      type="button"
                      onClick={() => setAsked(t.id)}
                      whileTap={{ scale: 0.98 }}
                      className="group flex items-center justify-between rounded-xl border border-line bg-white/60 px-4 py-3 text-left transition-colors hover:border-wood/40 hover:bg-white"
                    >
                      <span className="text-[13px] tracking-wide text-ink">
                        {l(t.label, locale)}
                      </span>
                      <span className="text-wood transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* 已问答（逐条浮现） */}
              {answered && (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-end"
                  >
                    <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-ink px-4 py-3 text-[13px] leading-relaxed text-cream">
                      {l(answered.label, locale)}
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="flex justify-start"
                  >
                    <div className="max-w-[85%] whitespace-pre-line rounded-2xl rounded-tl-sm bg-cream-deep px-4 py-3 text-[13px] leading-relaxed text-body">
                      {l(answered.answer, locale)}
                    </div>
                  </motion.div>
                  <button
                    type="button"
                    onClick={() => setAsked(null)}
                    className="text-xs text-mute underline-offset-2 transition-colors hover:text-wood hover:underline"
                  >
                    {dict.assistant.backToTopics} ↵
                  </button>
                </>
              )}
            </div>

            {/* 底注 */}
            <div className="border-t border-line bg-white/40 px-5 py-3">
              <p className="text-[11px] leading-relaxed text-mute">
                ✦ {dict.assistant.disclaimer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
