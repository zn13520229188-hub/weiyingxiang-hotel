import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getDictionary,
  h,
  isValidLocale,
  l,
  type Locale,
} from "@/lib/i18n";
import Hero from "@/components/home/Hero";
import Manifesto from "@/components/home/Manifesto";
import EscapeCity from "@/components/home/EscapeCity";
import SpaceSection from "@/components/home/SpaceSection";
import ExperienceSection from "@/components/home/ExperienceSection";
import ExploreSection from "@/components/home/ExploreSection";
import FaqList from "@/components/ui/FaqList";
import Reveal from "@/components/ui/Reveal";
import faq from "@/data/faq.json";

/** FAQPage 结构化数据（与页面可见 FAQ 同屏注入，供 AI 搜索理解） */
function faqSchema(locale: Locale) {
  const L = (v: { zh: string; en: string }) => l(v, locale);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: L(f.question),
      acceptedAnswer: { "@type": "Answer", text: L(f.answer) },
    })),
  };
}

/**
 * 首页 —— 一次「虚拟入住」：
 * 城市逃离 → 空间美学 → 入住体验 → 城市探索 → 常见问题
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = getDictionary(locale);

  const faqItems = faq.map((f) => ({
    id: f.id,
    question: l(f.question, locale),
    answer: l(f.answer, locale),
  }));

  return (
    <>
      <Hero locale={locale} dict={dict} />
      <Manifesto dict={dict} locale={locale} />
      <EscapeCity locale={locale} dict={dict} />
      <SpaceSection locale={locale} dict={dict} />
      <ExperienceSection locale={locale} dict={dict} />
      <ExploreSection locale={locale} dict={dict} />

      {/* FAQ —— 帮助 AI 搜索与访客理解酒店（同屏注入 FAQPage 结构化数据） */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(locale)) }}
      />
      <section className="section-pad bg-cream-deep">
        <Reveal>
          <FaqList items={faqItems} title={dict.faq.title} kicker={dict.faq.kicker} />
        </Reveal>
      </section>

      {/* 收尾 CTA */}
      <section className="section-pad bg-cream text-center">
        <Reveal>
          <p className="kicker">STAY WITH US</p>
          <h2 className="mx-auto mt-6 max-w-2xl font-serif text-3xl leading-snug tracking-wide text-ink sm:text-4xl">
            {dict.closing.title}
          </h2>
          <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-body">
            {dict.closing.body}
          </p>
          <div className="mt-12">
            <Link
              href={h(locale, "/contact")}
              className="inline-block bg-ink px-10 py-4 text-[13px] tracking-[0.25em] text-cream transition-colors duration-300 hover:bg-wood"
            >
              {dict.nav.contact}
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
