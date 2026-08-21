import Link from "next/link";
import { h, l, type Dict, type Locale } from "@/lib/i18n";
import ParallaxImage from "@/components/ui/ParallaxImage";
import Reveal from "@/components/ui/Reveal";
import experience from "@/data/experience.json";

type Props = { locale: Locale; dict: Dict };

/**
 * 叙事第三章「EXPERIENCE · 入住体验」
 * 大横图视差 + 三项体验速览
 */
export default function ExperienceSection({ locale, dict }: Props) {
  const firstThree = experience.items.slice(0, 3);

  return (
    <section className="bg-cream-deep">
      {/* 大横图：早餐时刻 */}
      <div className="relative h-[60vh] min-h-[420px]">
        <ParallaxImage
          src={experience.items[0].image}
          alt={l(experience.items[0].name, locale)}
          className="h-full w-full"
        />
        <div className="absolute inset-0 bg-ink/35" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <Reveal>
            <span className="kicker text-cream/75">03 · {dict.sections.experience}</span>
          </Reveal>
          <Reveal delay={0.15}>
            <h2 className="mt-6 font-serif text-4xl tracking-[0.12em] text-cream sm:text-5xl md:text-6xl">
              {dict.sections.experienceTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-8 max-w-md text-[15px] leading-relaxed text-cream/85">
              {experience.intro.text[locale]}
            </p>
          </Reveal>
        </div>
      </div>

      {/* 三项速览 */}
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid gap-12 md:grid-cols-3 md:gap-10">
          {firstThree.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.12}>
              <p className="kicker">{l(item.kicker, locale)}</p>
              <h3 className="mt-4 font-serif text-2xl tracking-wide text-ink">
                {l(item.name, locale)}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-body">
                {l(item.description, locale)}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-16 text-center">
            <Link
              href={h(locale, "/experience")}
              className="inline-block border-b border-wood pb-1 text-[13px] tracking-[0.25em] text-wood transition-colors duration-300 hover:border-ink hover:text-ink"
            >
              {dict.common.viewDetails}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
