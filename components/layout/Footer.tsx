import Link from "next/link";
import { h, type Dict, type Locale } from "@/lib/i18n";
import site from "@/data/site.json";

type Props = { locale: Locale; dict: Dict };

const NAV_LINKS = [
  { key: "home", path: "/" },
  { key: "hotel", path: "/hotel" },
  { key: "rooms", path: "/rooms" },
  { key: "experience", path: "/experience" },
  { key: "explore", path: "/explore" },
  { key: "contact", path: "/contact" },
] as const;

/** 页脚 —— 大字号品牌 + 导航/到访/联系三列 + 版权说明 */
export default function Footer({ locale, dict }: Props) {
  return (
    <footer className="border-t border-line bg-cream-deep">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        {/* 品牌大字 */}
        <div className="mb-16">
          <p className="font-serif text-5xl tracking-[0.15em] text-ink sm:text-6xl">
            {site.brand[locale]}
          </p>
          <p className="mt-3 text-xs tracking-[0.35em] text-mute">
            {site.tagline[locale]} · {site.positioning[locale]}
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-4">
          {/* 导航 */}
          <nav aria-label="Footer navigation">
            <p className="kicker mb-6">{dict.footer.visit}</p>
            <ul className="space-y-3">
              {NAV_LINKS.map(({ key, path }) => (
                <li key={key}>
                  <Link
                    href={h(locale, path)}
                    className="text-sm text-body transition-colors hover:text-wood"
                  >
                    {dict.nav[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 地址 */}
          <div>
            <p className="kicker mb-6">{dict.footer.contact}</p>
            <ul className="space-y-3 text-sm leading-relaxed text-body">
              <li>{site.address[locale]}</li>
              <li>
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-wood">
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-wood">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          {/* 到访信息 */}
          <div>
            <p className="kicker mb-6">{dict.common.since}</p>
            <ul className="space-y-3 text-sm leading-relaxed text-body">
              <li>{dict.contact.hours}: {dict.contact.hoursValue}</li>
              <li>{dict.footer.note}</li>
            </ul>
          </div>

          {/* 品牌宣言 */}
          <div>
            <p className="kicker mb-6">ESCAPE · SPACE · STAY</p>
            <p className="font-serif text-lg leading-relaxed text-body">
              {site.tagline[locale]}。
            </p>
          </div>
        </div>

        <div className="hairline mt-16" />
        <div className="mt-6 flex flex-col gap-2 text-xs text-mute sm:flex-row sm:items-center sm:justify-between">
          <p>{site.name[locale]} · {dict.footer.rights}</p>
          <p className="tracking-[0.2em]">{dict.brand.nameEn}</p>
        </div>
      </div>
    </footer>
  );
}
