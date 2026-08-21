import Link from "next/link";
import { h, l, type Dict, type Locale } from "@/lib/i18n";
import SectionHeading from "@/components/ui/SectionHeading";
import ParallaxImage from "@/components/ui/ParallaxImage";
import Reveal from "@/components/ui/Reveal";
import rooms from "@/data/rooms.json";

type Props = { locale: Locale; dict: Dict };

/**
 * 叙事第二章「SPACE · 空间美学」
 * 三图错落 + 房型名 —— 克制地展示空间
 */
export default function SpaceSection({ locale, dict }: Props) {
  // 取三个房型作展示（错位节奏）
  const shown = rooms.rooms.slice(0, 3);

  return (
    <section className="section-pad bg-cream">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <SectionHeading
            kicker={`02 · ${dict.sections.space}`}
            title={dict.sections.spaceTitle}
            text={rooms.intro.text[locale]}
          />
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3 md:gap-8">
          {shown.map((room, i) => (
            <Reveal
              key={room.id}
              delay={i * 0.15}
              className={i === 1 ? "md:mt-16" : ""}
            >
              <Link href={h(locale, "/rooms")} className="group block">
                <div className="aspect-[3/4] overflow-hidden">
                  <ParallaxImage
                    src={room.image}
                    alt={l(room.name, locale)}
                    className="h-full w-full"
                    imgClassName="transition-transform duration-[1600ms] ease-out group-hover:scale-105"
                  />
                </div>
                <div className="mt-5 flex items-baseline justify-between">
                  <h3 className="font-serif text-xl tracking-wide text-ink">
                    {l(room.name, locale)}
                  </h3>
                  <span className="text-xs tracking-[0.2em] text-mute">
                    {room.area} m²
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-mute">
                  {l(room.poem, locale)}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-16 text-center">
            <Link
              href={h(locale, "/rooms")}
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
