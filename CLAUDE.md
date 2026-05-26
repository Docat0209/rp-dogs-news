# DOG'S NEWS — 虛構新聞局

角色扮演用靜態新聞網站，以 Next.js 建構並部署於 Vercel。

## Tech Stack

- **Framework**: Next.js 16 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4
- **Content**: Markdown 檔案 (gray-matter 解析 frontmatter)
- **Markdown 渲染**: react-markdown + remark-gfm
- **Tests**: Vitest
- **Hosting**: Vercel

## 如何執行

```bash
npm run dev      # 本地開發伺服器 (http://localhost:3000)
npm run build    # 生產環境建置
npm run lint     # ESLint 檢查
npm test         # 執行單元測試
```

## 如何新增新聞文章

在 `content/news/` 資料夾中新增 `.md` 檔案：

```bash
# 檔名格式：YYYY-MM-DD-slug.md
content/news/2026-05-27-article-title.md
```

### Frontmatter 格式

```yaml
---
title: 文章標題
date: 2026-05-27
category: 政治         # 政治 | 社會 | 國際 | 體育 | 娛樂 | 文化 | 其他
excerpt: 簡短摘要（顯示於列表）
cover: /images/photo.jpg   # 可選：封面圖片
author: 編輯部              # 可選，預設「編輯部」
---

正文用 Markdown 寫...
```

### 圖片上傳

將圖片放入 `public/images/` 資料夾，然後在 frontmatter 用 `/images/filename.jpg` 引用。

## 目錄結構

```
content/
  news/          ← 所有文章（Markdown 檔案）
public/
  logo.png       ← 新聞局 logo
  images/        ← 文章配圖
src/
  app/           ← Next.js App Router pages
    news/[slug]/ ← 個別文章頁面
  components/    ← Header, Footer, NewsCard
  lib/posts.ts   ← Markdown 讀取工具函式
  types/post.ts  ← TypeScript 類型定義
```

## Environments

- Production: https://rp-dogs-news.vercel.app
- Staging: dev branch preview（push 到 dev 後 Vercel 自動生成 preview URL）

## 顏色配置

| 用途 | 顏色 |
|------|------|
| 主強調色 | `#CC0000` (紅) |
| 標題背景 | `#000000` (黑) |
| 頁面背景 | `#FFFFFF` (白) |
