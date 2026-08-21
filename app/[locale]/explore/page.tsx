import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, isValidLocale, l } from "@/lib/i18n";
import PageHero from "@/components/ui/PageHero";
import ParallaxImage from "@/components/ui/ParallaxImage";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import explore from "@/data/explore.json";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.explore.title,
    alternates: { canonical: `/${locale}/explore` },
    description: l(explore.intro.text, locale),
  };
}

/** 城市探索 —— 义乌微度假目的地 + 48 小时行程 */
export default async function ExplorePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const L = (v: { zh: string; en: string }) => l(v, locale);

  return (
    <>
      <PageHero
        image={explore.destinations[1].image}
        kicker={dict.explore.kicker}
        title={dict.explore.title}
        intro={L(explore.intro.text)}
      />

      {/* 目的地 */}
      <section className="section-pad bg-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-10 md:grid-cols-2 md:gap-8">
            {explore.destinations.map((d, i) => (
              <Reveal key={d.id} delay={(i % 2) * 0.12}>
                <div className={`group ${i % 2 === 1 ? "md:mt-16" : ""}`}>
                  <div className="aspect-[4/3] overflow-hidden">
                    <ParallaxImage
                      src={d.image}
                      alt={L(d.name)}
                      className="h-full w-full"
                      imgClassName="transition-transform duration-[1600ms] ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-5">
                    <p className="kicker">{L(d.kicker)}</p>
                    <h2 className="mt-3 font-serif text-2xl tracking-wide text-ink">
                      {L(d.name)}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-body">
                      {L(d.description)}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 48 小时行程 */}
      <section className="section-pad bg-cream-deep">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <Reveal>
            <SectionHeading
              kicker={L(explore.itinerary.kicker)}
              title={L(explore.itinerary.title)}
            />
          </Reveal>
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {explore.itinerary.days.map((day, i) => (
              <Reveal key={day.day.zh} delay={i * 0.15}>
                <div className="border border-line bg-cream p-9">
                  <p className="kicker">{L(day.day)}</p>
                  <ul className="mt-6 space-y-5">
                    {day.items.map((item, j) => (
                      <li key={j} className="flex items-baseline gap-4 text-[15px] text-body">
                        <span className="font-serif text-sm text-wood">
                          {String(j + 1).padStart(2, "0")}
                        </span>
                        {L(item)}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
