import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, isValidLocale, l } from "@/lib/i18n";
import PageHero from "@/components/ui/PageHero";
import ParallaxImage from "@/components/ui/ParallaxImage";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import hotel from "@/data/hotel.json";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.hotel.title,
    alternates: { canonical: `/${locale}/hotel` },
    description: l(hotel.story.paragraphs[0], locale),
  };
}

/** 酒店故事 —— 品牌起源 · 设计理念 · 服务理念 */
export default async function HotelPage({
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
        image={hotel.images.main}
        kicker={dict.hotel.kicker}
        title={dict.hotel.title}
        intro={L(hotel.story.paragraphs[0])}
      />

      {/* 品牌故事 */}
      <section className="section-pad bg-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
          <Reveal>
            <div className="aspect-[4/3]">
              <ParallaxImage
                src={hotel.images.detail}
                alt={L(hotel.design.title)}
                className="h-full w-full"
              />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <span className="kicker">{L(hotel.story.kicker)}</span>
              <h2 className="mt-6 font-serif text-3xl leading-snug tracking-wide text-ink sm:text-4xl">
                {L(hotel.story.title)}
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="prose-luxe mt-8 text-[15px] leading-relaxed text-body">
                {hotel.story.paragraphs.map((p, i) => (
                  <p key={i}>{L(p)}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 设计理念 */}
      <section className="section-pad bg-cream-deep">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <SectionHeading
              kicker={L(hotel.design.kicker)}
              title={L(hotel.design.title)}
              align="left"
            />
          </Reveal>
          <div className="mt-14 grid gap-10 lg:grid-cols-2">
            <Reveal delay={0.1}>
              <div className="prose-luxe text-[15px] leading-relaxed text-body">
                {hotel.design.paragraphs.map((p, i) => (
                  <p key={i}>{L(p)}</p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="grid grid-cols-2 gap-px border border-line bg-line">
                {hotel.design.principles.map((p) => (
                  <div key={p.zh} className="bg-cream px-8 py-10 text-center">
                    <p className="font-serif text-xl tracking-[0.2em] text-ink">
                      {p.zh}
                    </p>
                    <p className="mt-2 text-[11px] tracking-[0.25em] text-mute">
                      {p.en.toUpperCase()}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 服务理念 */}
      <section className="section-pad bg-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <SectionHeading kicker={L(hotel.service.kicker)} title={L(hotel.service.title)} />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-8 max-w-2xl text-center text-[15px] leading-relaxed text-body">
              {L(hotel.service.paragraphs[0])}
            </p>
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {hotel.service.features.map((f, i) => (
              <Reveal key={f.title.zh} delay={i * 0.12}>
                <div className="h-full border border-line bg-white/50 p-9 text-center transition-colors duration-500 hover:bg-white">
                  <span className="font-serif text-3xl text-wood" aria-hidden>
                    {["✦", "☾", "⌖"][i] ?? "✦"}
                  </span>
                  <h3 className="mt-5 font-serif text-xl tracking-wide text-ink">
                    {L(f.title)}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-body">
                    {L(f.text)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 数字 */}
      <section className="border-y border-line bg-cream-deep">
        <div className="mx-auto grid max-w-5xl grid-cols-3 divide-x divide-line px-6 py-16">
          {hotel.stats.map((s) => (
            <div key={s.label.zh} className="px-4 text-center">
              <p className="font-serif text-3xl text-ink sm:text-4xl">{s.value}</p>
              <p className="mt-2 text-[11px] tracking-[0.2em] text-mute">
                {L(s.label)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
