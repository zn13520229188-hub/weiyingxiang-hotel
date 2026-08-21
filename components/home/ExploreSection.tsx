import Link from "next/link";
import { h, l, type Dict, type Locale } from "@/lib/i18n";
import SectionHeading from "@/components/ui/SectionHeading";
import ParallaxImage from "@/components/ui/ParallaxImage";
import Reveal from "@/components/ui/Reveal";
import explore from "@/data/explore.json";

type Props = { locale: Locale; dict: Dict };

/**
 * 叙事第四章「EXPLORE YIWU · 城市探索」
 * 双图错位 + 城市微度假概念
 */
export default function ExploreSection({ locale, dict }: Props) {
  const two = explore.destinations.slice(0, 2); // 商贸城 + 江畔

  return (
    <section className="section-pad bg-cream">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <SectionHeading
            kicker={`04 · ${dict.sections.exploreYiwu}`}
            title={dict.sections.exploreYiwuTitle}
            text={explore.intro.text[locale]}
          />
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-2 md:gap-10">
          {two.map((d, i) => (
            <Reveal
              key={d.id}
              delay={i * 0.15}
              className={i === 1 ? "md:mt-20" : ""}
            >
              <Link href={h(locale, "/explore")} className="group block">
                <div className="aspect-[4/3] overflow-hidden">
                  <ParallaxImage
                    src={d.image}
                    alt={l(d.name, locale)}
                    className="h-full w-full"
                    imgClassName="transition-transform duration-[1600ms] ease-out group-hover:scale-105"
                  />
                </div>
                <div className="mt-5">
                  <p className="kicker">{l(d.kicker, locale)}</p>
                  <h3 className="mt-3 font-serif text-2xl tracking-wide text-ink">
                    {l(d.name, locale)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-body">
                    {l(d.description, locale)}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-16 text-center">
            <Link
              href={h(locale, "/explore")}
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
