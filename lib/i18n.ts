/**
 * 轻量 i18n 内核（零依赖）
 * - 双语言 locale: zh / en，首页默认中文
 * - UI 文案走字典（lib/i18n/zh.ts, en.ts）
 * - 内容文案走 data/*.json，字段为 { zh, en } 双语对象
 */
import zh from "./i18n/zh";
import en from "./i18n/en";

export type Locale = "zh" | "en";
export const locales: Locale[] = ["zh", "en"];
export const defaultLocale: Locale = "zh";

export type Dict = typeof zh;

const dicts: Record<Locale, Dict> = { zh, en };

/** 取字典（服务端组件用） */
export function getDictionary(locale: Locale): Dict {
  return dicts[locale] ?? dicts.zh;
}

/** 校验 locale，无效回退默认 */
export function isValidLocale(v: string | undefined): v is Locale {
  return v === "zh" || v === "en";
}

/** 数据 JSON 里的双语字段类型 */
export type L10n = { zh: string; en: string };

/** 从双语字段取值 */
export function l(v: L10n | undefined | null, locale: Locale, fallback = ""): string {
  if (!v) return fallback;
  return v[locale] ?? v.zh ?? fallback;
}

/** 生成站内链接（带上 locale 前缀） */
export function h(locale: Locale, path: `/${string}`): string {
  return `/${locale}${path === "/" ? "" : path}`;
}
