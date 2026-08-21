import Link from "next/link";
import { h, type Dict, type Locale } from "@/lib/i18n";
import ParallaxImage from "@/components/ui/ParallaxImage";
import Reveal from "@/components/ui/Reveal";
import site from "@/data/site.json";

type Props = { locale: Locale; dict: Dict };

/**
 * 叙事第一章「ESCAPE CITY · 城市逃离」
 * 全宽视差大图 + 中央文字 —— 像电影章节卡
 */
export default function EscapeCity({ locale, dict }: Props) {
  return (
    <section className="relative">
      <div className="relative h-[72vh] min-h-[460px]">
        <ParallaxImage
          src={site.images.light}
          alt={dict.sections.escape}
          className="h-full w-full"
        />
        {/* 压光保证文字可读 */}
        <div className="absolute inset-0 bg-ink/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <Reveal>
            <span className="kicker text-cream/75">01 · {dict.sections.escape}</span>
          </Reveal>
          <Reveal delay={0.15}>
            <h2 className="mt-6 font-serif text-4xl tracking-[0.12em] text-cream sm:text-5xl md:text-6xl">
              {dict.sections.escapeTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-8 max-w-md text-[15px] leading-relaxed text-cream/85">
              {site.description[locale]}
            </p>
          </Reveal>
          <Reveal delay={0.45}>
            <Link
              href={h(locale, "/hotel")}
              className="mt-12 inline-block border-b border-cream/50 pb-1 text-[13px] tracking-[0.25em] text-cream transition-colors duration-300 hover:border-cream hover:text-white"
            >
              {dict.common.viewDetails}
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
