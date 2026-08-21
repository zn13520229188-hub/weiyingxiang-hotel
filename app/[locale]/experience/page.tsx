import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, isValidLocale, l } from "@/lib/i18n";
import PageHero from "@/components/ui/PageHero";
import ParallaxImage from "@/components/ui/ParallaxImage";
import Reveal from "@/components/ui/Reveal";
import experience from "@/data/experience.json";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.experience.title,
    alternates: { canonical: `/${locale}/experience` },
    description: l(experience.intro.text, locale),
  };
}

/** 入住体验 —— 早餐 · 下午茶 · 睡眠 · 服务 · 公共空间 */
export default async function ExperiencePage({
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
        image={experience.items[0].image}
        kicker={dict.experience.kicker}
        title={dict.experience.title}
        intro={L(experience.intro.text)}
      />

      <section className="section-pad bg-cream">
        <div className="mx-auto max-w-6xl space-y-28 px-6 lg:px-10">
          {experience.items.map((item, i) => {
            const flip = i % 2 === 1;
            return (
              <div
                key={item.id}
                className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20"
              >
                <Reveal className={flip ? "lg:order-2" : ""}>
                  <div className="aspect-[4/3]">
                    <ParallaxImage
                      src={item.image}
                      alt={L(item.name)}
                      className="h-full w-full"
                    />
                  </div>
                </Reveal>
                <div className={flip ? "lg:order-1" : ""}>
                  <Reveal>
                    <span className="kicker">{L(item.kicker)}</span>
                    <h2 className="mt-4 font-serif text-3xl tracking-wide text-ink sm:text-4xl">
                      {L(item.name)}
                    </h2>
                  </Reveal>
                  <Reveal delay={0.12}>
                    <p className="mt-6 text-[15px] leading-relaxed text-body">
                      {L(item.description)}
                    </p>
                  </Reveal>
                  <Reveal delay={0.22}>
                    <ul className="mt-8 space-y-3">
                      {item.details.map((d) => (
                        <li key={d.zh} className="flex items-center gap-3 text-sm text-body">
                          <span className="h-px w-6 bg-wood" aria-hidden />
                          {L(d)}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
