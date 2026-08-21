import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, isValidLocale, l } from "@/lib/i18n";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import MessageForm from "@/components/contact/MessageForm";
import site from "@/data/site.json";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.contact.title,
    alternates: { canonical: `/${locale}/contact` },
    description: l(site.description, locale),
  };
}

/** 联系方式 —— 到访信息 + 留言（演示） */
export default async function ContactPage({
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
        image={site.images.plant}
        kicker={dict.contact.kicker}
        title={dict.contact.title}
        intro={L(site.description)}
      />

      <section className="section-pad bg-cream">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-2 lg:gap-24 lg:px-10">
          {/* 到访信息 */}
          <div>
            <Reveal>
              <p className="kicker">{dict.contact.address}</p>
              <p className="mt-4 font-serif text-2xl leading-relaxed tracking-wide text-ink">
                {L(site.address)}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-12 space-y-10">
                <div>
                  <p className="kicker">{dict.contact.phone}</p>
                  <a
                    href={`tel:${site.phone.replace(/\s/g, "")}`}
                    className="mt-3 block font-serif text-xl text-ink transition-colors hover:text-wood"
                  >
                    {site.phone}
                  </a>
                </div>
                <div>
                  <p className="kicker">{dict.contact.email}</p>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-3 block font-serif text-xl text-ink transition-colors hover:text-wood"
                  >
                    {site.email}
                  </a>
                </div>
                <div>
                  <p className="kicker">{dict.contact.hours}</p>
                  <p className="mt-3 font-serif text-xl text-ink">
                    {dict.contact.hoursValue}
                  </p>
                </div>
              </div>
            </Reveal>

            {/* 交通指引（引用 FAQ 数据，保持全站口径一致） */}
            <Reveal delay={0.2}>
              <div className="mt-14 border-t border-line pt-8">
                <p className="kicker !text-[11px]">TRANSIT</p>
                <ul className="mt-4 space-y-2 text-sm text-mute">
                  <li>· {L(transit[0])}</li>
                  <li>· {L(transit[1])}</li>
                  <li>· {L(transit[2])}</li>
                </ul>
              </div>
            </Reveal>
          </div>

          {/* 留言表单 */}
          <Reveal delay={0.15}>
            <div>
              <p className="kicker">{dict.contact.formTitle}</p>
              <h2 className="mt-4 font-serif text-3xl leading-snug tracking-wide text-ink">
                {locale === "zh" ? "给我们留一句话。" : "Leave us a note."}
              </h2>
              <div className="mt-10">
                <MessageForm dict={dict} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

// 交通指引文案 —— 与 faq.json 的 location 问答保持口径一致（改一处需同步两处）
const transit = [
  { zh: "距义乌国际商贸城约 5 分钟车程", en: "About 5 minutes from Yiwu International Trade Market" },
  { zh: "距义乌站约 20 分钟车程", en: "About 20 minutes from Yiwu Railway Station" },
  { zh: "距义乌机场约 30 分钟车程", en: "About 30 minutes from Yiwu Airport" },
];
