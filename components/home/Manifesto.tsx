import Reveal from "@/components/ui/Reveal";
import { l, type Dict, type Locale } from "@/lib/i18n";
import hotel from "@/data/hotel.json";

type Props = { dict: Dict; locale: Locale };

/**
 * 品牌宣言 —— 全站基调句：
 * 「酒店不是展示奢华，而是让人重新安静下来。」
 */
export default function Manifesto({ dict, locale }: Props) {
  return (
    <section className="section-pad bg-cream">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <span className="kicker">{dict.manifesto.kicker}</span>
        </Reveal>
        <Reveal delay={0.12}>
          <h2 className="mt-8 font-serif text-3xl leading-snug tracking-wide text-ink sm:text-4xl md:text-[2.75rem]">
            {dict.manifesto.title}
          </h2>
        </Reveal>
        <Reveal delay={0.24}>
          <p className="mx-auto mt-8 max-w-xl text-[15px] leading-relaxed text-body">
            {dict.manifesto.body}
          </p>
        </Reveal>

        {/* 设计四柱 */}
        <Reveal delay={0.34}>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-4 gap-y-4">
            {hotel.design.principles.map((p, i) => (
              <span key={i} className="flex items-center gap-4 text-[13px] tracking-[0.3em] text-mute">
                {l(p, locale)}
                {i < hotel.design.principles.length - 1 && (
                  <span className="text-wood" aria-hidden>·</span>
                )}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
