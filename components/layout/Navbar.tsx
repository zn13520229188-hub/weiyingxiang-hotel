"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { h, type Dict, type Locale } from "@/lib/i18n";

type Props = { locale: Locale; dict: Dict };

const NAV_LINKS = [
  { key: "home", path: "/" },
  { key: "hotel", path: "/hotel" },
  { key: "rooms", path: "/rooms" },
  { key: "experience", path: "/experience" },
  { key: "explore", path: "/explore" },
  { key: "contact", path: "/contact" },
] as const;

/**
 * 顶栏 —— 克制式：
 * 未滚动：透明 + 白字（浮在 Hero 深色图之上）
 * 滚动后：米白毛玻璃 + 底部细线
 * 移动端：全屏深墨抽屉，衬线大字逐项浮现
 */
export default function Navbar({ locale, dict }: Props) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 移动端抽屉打开时锁定背景滚动
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const light = !scrolled && !open;
  const langTarget = locale === "zh" ? "en" : "zh";
  const switchPath = pathname.replace(/^\/(zh|en)/, `/${langTarget}`);

  // Esc 关闭移动端抽屉（无障碍）
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-line bg-cream/90 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          {/* Logo */}
          <Link
            href={h(locale, "/")}
            className="group flex items-baseline gap-3"
            aria-label={dict.brand.name}
          >
            <span
              className={`font-serif text-2xl tracking-[0.2em] transition-colors duration-500 ${
                light ? "text-cream" : "text-ink"
              }`}
            >
              {dict.brand.name}
            </span>
            <span
              className={`hidden text-[10px] tracking-[0.3em] transition-colors duration-500 sm:block ${
                light ? "text-cream/60" : "text-mute"
              }`}
            >
              {dict.brand.nameEn}
            </span>
          </Link>

          {/* 桌面导航 */}
          <nav className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map(({ key, path }) => {
              const active = pathname === h(locale, path);
              return (
                <Link
                  key={key}
                  href={h(locale, path)}
                  className={`relative py-1 text-[13px] tracking-[0.18em] transition-colors duration-300 ${
                    light ? "text-cream/85 hover:text-cream" : "text-body hover:text-ink"
                  } ${active ? "font-medium" : ""}`}
                >
                  {dict.nav[key]}
                  {active && (
                    <span
                      className={`absolute -bottom-0.5 left-0 right-0 h-px transition-colors duration-500 ${
                        light ? "bg-cream/70" : "bg-wood"
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* 语言切换 + 移动端汉堡 */}
          <div className="flex items-center gap-5">
            <Link
              href={switchPath}
              className={`text-xs tracking-[0.2em] transition-colors duration-300 ${
                light || open ? "text-cream/70 hover:text-cream" : "text-mute hover:text-ink"
              }`}
              aria-label={locale === "zh" ? "Switch to English" : "切换到中文"}
            >
              {locale === "zh" ? "EN" : "中"}
            </Link>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className={`flex h-10 w-10 items-center justify-center lg:hidden ${
                light || open ? "text-cream" : "text-ink"
              }`}
              aria-label={open ? (locale === "zh" ? "关闭菜单" : "Close menu") : locale === "zh" ? "打开菜单" : "Open menu"}
              aria-expanded={open}
            >
              <div className="relative h-3.5 w-6">
                <span
                  className={`absolute left-0 top-0 h-px w-full transition-all duration-300 ${
                    open ? "translate-y-[6px] rotate-45 bg-cream" : light ? "bg-cream" : "bg-ink"
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-px w-full transition-all duration-300 ${
                    open ? "-translate-y-[6px] -rotate-45 bg-cream" : light ? "bg-cream" : "bg-ink"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* 移动端全屏抽屉 */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            role="dialog"
            aria-modal="true"
            aria-label={locale === "zh" ? "导航菜单" : "Navigation menu"}
            className="fixed inset-0 z-40 flex flex-col bg-ink pt-28 lg:hidden"
          >
            <nav className="flex flex-col gap-2 px-10">
              {NAV_LINKS.map(({ key, path }, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i + 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={h(locale, path)}
                    onClick={() => setOpen(false)}
                    className={`block border-b border-cream/10 py-5 font-serif text-3xl tracking-wider ${
                      pathname === h(locale, path) ? "text-wood" : "text-cream"
                    }`}
                  >
                    {dict.nav[key]}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-auto px-10 pb-10 text-xs tracking-[0.3em] text-cream/40"
            >
              {dict.brand.nameEn} · {dict.common.since}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
