# SESSION_HANDOFF · 蔚印象酒店官网

> 更新：2026-08-21 · 一期完成

## 当前主题

义乌市蔚印象设计师酒店 AI Native 官网（Next.js 16 + TS + Tailwind v4 + Framer Motion，双语 /zh /en）

## 已完成

- 6 页面全量开发：首页（Escape City → Space → Experience → Explore 四章节叙事）+ Hotel/Rooms/Experience/Explore/Contact
- 「探索蔚印象」AI 顾问（右下角浮动按钮，3 个预设主题，数据驱动）
- GEO：Hotel + FAQPage JSON-LD、每页独立 metadata/canonical、sitemap、robots、双语 404
- 三专家审查（品牌/UX/AI 搜索）全部问题已修复，lint 0 警告 0 错误，`npm run build` 通过
- 图片已本地化（16 张 Unsplash 安缦风占位图，已验证风格匹配）
- **已部署 GitHub Pages（2026-08-21）**：
  - 公开仓库：github.com/zn13520229188-hub/weiyingxiang-hotel
  - 站点：https://zn13520229188-hub.github.io/weiyingxiang-hotel/（zh 首页 /zh/）
  - 自动部署：push 到 main 即重新构建上线（约 2 分钟）
  - 已做静态导出改造：basePath=/weiyingxiang-hotel、根路径客户端跳转、images.unoptimized

## 待确认 / 待办

- [ ] 替换占位数据：电话、地址、邮箱、客房数、坐标（data/site.json，标注"待更新"）
- [ ] 替换域名 weiimpression.cn（data/site.json → siteUrl，影响 sitemap/OG/schema）
- [ ] 换实拍图（public/images/ 同名替换即可）
- [ ] AI 顾问接真实网关（替换 data/assistant.json 数据源）

## 关键文件

- 架构：`ARCHITECTURE.md`；替换指南：`README.md`
- 内容全部在 `data/*.json`（双语字段 {zh, en}）
- 图片：`public/images/`（hero=lobby.jpg、hotel-hero.jpg 等）

## 运行

```bash
npm run dev    # http://localhost:3000
```
