import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import {
  getDictionary,
  isValidLocale,
  l,
  locales,
} from "@/lib/i18n";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AIAssistant from "@/components/layout/AIAssistant";
import site from "@/data/site.json";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f4f1ea",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = getDictionary(locale);
  const base = site.siteUrl;
  const home = `/${locale}`;

  return {
    title: {
      default: dict.meta.title,
      template: `%s · ${site.brand[locale]}`,
    },
    description: dict.meta.description,
    metadataBase: new URL(base),
    alternates: {
      canonical: home,
      languages: { "zh-CN": "/zh", "en": "/en" },
    },
    openGraph: {
      type: "website",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      url: home,
      siteName: site.name[locale],
      title: dict.meta.title,
      description: dict.meta.description,
      images: [{ url: `${base}${site.images.hero}`, width: 1600, height: 1067, alt: site.name[locale] }],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: [`${base}${site.images.hero}`],
    },
  };
}

/**
 * [locale] 根布局 —— html 语言动态化 + 全局框架（导航/页脚/AI 助手）
 * GEO：注入 Hotel 实体结构化数据（仅放已核实字段，占位电话/门牌不写入）
 * FAQPage 结构化数据在首页注入（与可见内容同页，避免全站重复声明）
 */
export default async function LocaleLayout({ params, children }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const L = (v: { zh: string; en: string } | undefined) => l(v, locale);

  const hotelSchema = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: L(site.name),
    alternateName: L(site.brand),
    description: L(site.description),
    image: [
      `${site.siteUrl}${site.images.hero}`,
      `${site.siteUrl}${site.images.light}`,
      `${site.siteUrl}${site.images.plant}`,
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: locale === "zh" ? "义乌市" : "Yiwu",
      addressRegion: locale === "zh" ? "浙江省" : "Zhejiang",
      addressCountry: "CN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.coordinates.lat,
      longitude: site.coordinates.lng,
    },
    numberOfRooms: site.roomsCount,
    priceRange: "¥¥¥",
    url: `${site.siteUrl}/${locale}`,
    keywords:
      locale === "zh"
        ? "义乌酒店,设计师酒店,城市微度假,精品酒店,义乌微度假"
        : "Yiwu hotel,design hotel,urban micro-vacation,boutique hotel",
    amenityFeature: [
      "WiFi", "24小时前台", "餐厅", "庭院", "顶层露台", "洗衣服务", "智能客控",
    ].map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
    })),
    checkinTime: "14:00",
    checkoutTime: "12:00",
  };

  return (
    <html lang={locale === "zh" ? "zh-CN" : "en"}>
      <body className="min-h-screen antialiased">
        {/* GEO：Hotel 实体结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelSchema) }}
        />
        {/* 无障碍：跳至正文 */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-cream"
        >
          {locale === "zh" ? "跳至正文" : "Skip to content"}
        </a>
        <Navbar locale={locale} dict={dict} />
        <main id="main" className="flex-1">{children}</main>
        <Footer locale={locale} dict={dict} />
        <AIAssistant locale={locale} dict={dict} />
      </body>
    </html>
  );
}
