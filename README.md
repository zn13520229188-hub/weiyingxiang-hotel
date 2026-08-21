# 义乌市蔚印象设计师酒店 · AI Native 官网

城市微度假设计师酒店品牌官网 —— 中国酒店 AI 化升级案例。
安缦式克制美学：留白 · 光影 · 木质 · 石材 · 东方美学。

## 快速开始

```bash
npm install
npm run dev        # http://localhost:3000（默认中文首页，/zh）
npm run build      # 生产构建
npm start          # 生产运行
```

## 技术栈

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Framer Motion（克制系动画：淡入、慢位移、视差、缓慢缩放）
- 双语：`/zh` 中文（默认）、`/en` English

## 页面

| 路由 | 内容 |
|---|---|
| `/` | 重定向至 `/zh` |
| `/zh` `/en` | 首页：Escape City → Space → Experience → Explore 四章节叙事 |
| `/hotel` | 酒店故事 · 设计理念 · 服务理念 |
| `/rooms` | 四个房型（精品酒店语言） |
| `/experience` | 早餐 / 下午茶 / 睡眠 / 服务 / 公共空间 |
| `/explore` | 义乌目的地 + 48 小时行程 |
| `/contact` | 到访信息 + 留言（演示） |

## 如何替换内容（未来换店/换资料）

**所有内容在 `/data/*.json`，结构与组件解耦，只改数据不动代码：**

| 文件 | 内容 |
|---|---|
| `data/site.json` | 店名、地址、电话、邮箱、坐标、OG 图片、首页 Hero 图 |
| `data/hotel.json` | 品牌故事、设计理念、服务理念、数字 |
| `data/rooms.json` | 房型（名称/意象句/描述/设施/图） |
| `data/experience.json` | 体验项 |
| `data/explore.json` | 城市目的地、48h 行程 |
| `data/faq.json` | FAQ（同步注入 FAQPage 结构化数据） |
| `data/assistant.json` | AI 顾问「探索蔚印象」的问答内容 |
| `lib/i18n/zh.ts` `en.ts` | 界面文案（导航、按钮、页脚等） |

每个文案字段均为 `{ "zh": "...", "en": "..." }` 双语结构，可只改中文。

## 如何替换图片

图片在 `public/images/`，**替换同名文件即换图**（尺寸建议 1600px 宽、竖图 3:4/横图 4:3 或 16:9，JPEG/WebP）。

当前为 Unsplash 高质量占位图（暖灰/木质/自然光风格），正式开业后换成实拍图即可。`data/*.json` 中的 `image` 字段指向对应文件，也可直接改路径。

## AI Native 特性

1. **「探索蔚印象」AI 顾问**：右下角浮动按钮，三个预设主题（酒店介绍/入住建议/城市推荐）对话式展示 —— 一期为概念演示，接真实 AI 网关时只替换 `data/assistant.json` 的数据来源。
2. **GEO 结构化数据**：全站注入 JSON-LD —— `Hotel` 实体（含地理位置/设施/客房数/入住退房时间）+ `FAQPage`（5 组问答），AI 搜索可直接读懂"这是什么酒店、适合谁、特色、在哪、怎么订"。
3. 每页独立 metadata + OG/Twitter 卡片 + sitemap.xml（zh/en 双语 alternate）+ robots.txt。

## 注意事项（占位数据）

- 地址、电话、邮箱、客房数、面积、坐标：均为占位示例（`site.json` 中标注"待更新"），上线前请替换为真实信息。
- 留言表单为演示占位，未接后端。
- 站点域名 `weiimpression.cn` 为示例，需替换（`data/site.json` → `siteUrl`，用于 sitemap/OG/结构化数据）。

## 目录结构

```
app/
  [locale]/           # zh/en 双语路由（layout 注入框架 + JSON-LD）
  sitemap.ts robots.ts not-found.tsx
components/
  layout/   Navbar · Footer · AIAssistant
  ui/       Reveal · ParallaxImage · SectionHeading · FaqList · PageHero
  home/     Hero · Manifesto · EscapeCity · SpaceSection · ExperienceSection · ExploreSection
  contact/  MessageForm
data/                 # 全站内容（双语 JSON）
lib/                  # i18n 内核 + 字典
public/images/        # 本地图片（替换同名即换图）
```
