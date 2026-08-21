import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, isValidLocale, l } from "@/lib/i18n";
import PageHero from "@/components/ui/PageHero";
import ParallaxImage from "@/components/ui/ParallaxImage";
import Reveal from "@/components/ui/Reveal";
import rooms from "@/data/rooms.json";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.rooms.title,
    alternates: { canonical: `/${locale}/rooms` },
    description: l(rooms.intro.text, locale),
  };
}

/** 客房空间 —— 四个房型，精品酒店语言（不写面积堆砌，写氛围） */
export default async function RoomsPage({
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
        image={rooms.rooms[0].image}
        kicker={dict.rooms.kicker}
        title={dict.rooms.title}
        intro={L(rooms.intro.text)}
      />

      <section className="section-pad bg-cream">
        <div className="mx-auto max-w-6xl space-y-28 px-6 lg:px-10">
          {rooms.rooms.map((room, i) => {
            const flip = i % 2 === 1; // 偶数项图文左右交替
            return (
              <div
                key={room.id}
                className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20"
              >
                <Reveal className={flip ? "lg:order-2" : ""}>
                  <div className="aspect-[4/3]">
                    <ParallaxImage
                      src={room.image}
                      alt={L(room.name)}
                      className="h-full w-full"
                    />
                  </div>
                </Reveal>
                <div className={flip ? "lg:order-1" : ""}>
                  <Reveal>
                    <span className="kicker">{L(room.kicker)}</span>
                    <div className="mt-4 flex items-baseline gap-4">
                      <h2 className="font-serif text-3xl tracking-wide text-ink sm:text-4xl">
                        {L(room.name)}
                      </h2>
                      <span className="text-xs tracking-[0.2em] text-mute">
                        {room.area} m²
                      </span>
                    </div>
                  </Reveal>
                  <Reveal delay={0.12}>
                    <p className="mt-6 font-serif text-lg italic leading-relaxed text-wood">
                      {L(room.poem)}
                    </p>
                    <p className="prose-luxe mt-6 text-[15px] leading-relaxed text-body">
                      {L(room.description)}
                    </p>
                  </Reveal>
                  <Reveal delay={0.22}>
                    <p className="kicker mt-10 !text-[11px]">{dict.rooms.amenities}</p>
                    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                      {room.facilities.map((f) => (
                        <li key={f.zh} className="flex items-start gap-2 text-sm text-body">
                          <span className="mt-0.5 text-wood" aria-hidden>·</span>
                          {L(f)}
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
