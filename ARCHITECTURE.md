# 蔚印象设计师酒店 · 官网架构设计

> 义乌市蔚印象设计师酒店 AI Native 官网 —— 中国酒店 AI 化升级案例
> 设计原则：留白 · 光影 · 木质 · 石材 · 东方美学 · 极简克制（安缦式，非奢华堆砌）

## 1. 信息架构（IA）

```
/ (zh, 默认)       首页 —— 虚拟入住叙事四章节
  ├── §Escape City   城市逃离（全屏 Hero，光影慢动画）
  ├── §Space         空间美学（客房/大堂/细节，沉浸图组）
  ├── §Experience    入住体验（早餐/下午茶/服务）
  └── §Explore Yiwu  城市探索（义乌文化/周末微度假）
/hotel             酒店故事（品牌/设计理念/服务理念）
/rooms             客房空间（房型 × 精品酒店语言）
/experience        酒店体验（早餐/公共空间/服务细节）
/explore           义乌城市探索
/contact           联系方式
/en/*              英文镜像（全站双语）
```

## 2. 技术架构

| 层 | 方案 | 说明 |
|---|---|---|
| 框架 | Next.js 15 (App Router) + TS | 服务端渲染，SEO 友好 |
| 样式 | Tailwind CSS v4 | CSS-first 配置，设计令牌集中在 globals.css |
| 动画 | Framer Motion | 克制系：淡入、慢位移、视差、缓慢缩放 |
| 数据层 | `/data/*.json`（hotel/rooms/experience/explore/faq/site） | 内容与组件解耦，未来换店只改 JSON |
| i18n | 自研轻量 dict（lib/i18n.ts）+ `[locale]` 路由 | 零依赖，zh/en 双静态页 |
| 图片 | `public/images/` 本地 16 张安缦风实拍占位图 | next/image 优化，替换同名文件即换图 |

## 3. 设计系统（安缦式克制）

**色彩**
- 米白 `#F4F1EA`（主底）/ 深墨 `#1C1B18`（文字）
- 正文灰 `#4A463F` / 细线 `#E2DDD2` / 木色 `#8A7355`（点缀）/ 鼠尾草绿 `#7A8071`（辅助）

**字体**（衬线表达高级感，零网络依赖）
- 标题：`Cormorant Garamond / Didot / Georgia`（英）+ `Songti SC / Noto Serif SC`（中）
- 正文：系统无衬线栈

**节奏**：12px 基数网格；章节 160px 上下留白；标题字距大、字号大，正文小且灰

## 4. 动画系统（高级·克制·像酒店宣传片）

| 动画 | 实现 | 参数 |
|---|---|---|
| Hero 入场 | 背景 2.4s 缓慢放大 + 标题逐字距展开 + 副标延迟淡入 | easeOut |
| 滚动浮现 | `Reveal`：whileInView 透明度 0→1 + 位移 40→0 | 1s，once |
| 图片视差 | `ParallaxImage`：useScroll + useTransform | 位移 ±8% |
| 章节切换 | 全宽图 + 大字标，滚动时缓慢缩放 | 1.2–2s |

禁止：弹跳、霓虹、炫技动效。

## 5. AI 助手（模拟版，第一版为概念演示）

- 右下角浮动按钮「探索蔚印象」
- 打开轻量抽屉，三个预设服务：酒店介绍 / 入住建议 / 城市推荐
- 内容数据驱动（data/assistant.json），后续接真实 AI 网关时只替换数据源
- 视觉克制：与品牌同色系，明确标注为「AI 顾问（演示）」，不夸大

## 6. GEO / AI 搜索友好

- 根 layout 注入 JSON-LD：`Hotel`（DesignHotel、Yiwu、设施、图片）+ `FAQPage`（4 组问答）
- 全站 metadata（title/description/OG/alternates 双语）
- `sitemap.xml` + `robots.txt`
- 文案直白结构化，AI 可理解：这是什么酒店 / 适合谁 / 特色是什么

## 7. 目录结构

```
app/
  [locale]/                # zh/en 双语路由
    layout.tsx             # 全局框架 + JSON-LD
    page.tsx               # 首页叙事
    hotel|rooms|experience|explore|contact/page.tsx
  sitemap.ts / robots.ts
components/
  layout/   Navbar, Footer, AIAssistant, LanguageSwitcher
  ui/       Reveal, ParallaxImage, SectionHeading, HeroImage, FaqList
  home/     Hero, EscapeCity, Space, Experience, ExploreYiwu, Manifesto
data/       *.json（全站内容）
lib/        i18n.ts, utils.ts
```
