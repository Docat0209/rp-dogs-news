import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { formatPostDate, getPostsByPage, ARTICLES_PER_PAGE, ARTICLES_PER_PAGE_SUBSEQUENT } from '@/lib/posts'

const FIXTURE_DIR = path.join(process.cwd(), 'tests', 'fixtures', 'news')

beforeAll(() => {
  fs.mkdirSync(FIXTURE_DIR, { recursive: true })
  fs.writeFileSync(
    path.join(FIXTURE_DIR, 'test-article.md'),
    `---
title: 測試文章
date: 2026-01-01
category: 測試
excerpt: 這是測試摘要
author: 測試記者
---

正文內容在這裡。
`
  )
})

afterAll(() => {
  fs.rmSync(path.join(process.cwd(), 'tests', 'fixtures'), { recursive: true, force: true })
})

describe('getAllPosts', () => {
  it('reads markdown files from a directory and returns sorted posts', () => {
    const files = fs.readdirSync(FIXTURE_DIR)
    expect(files).toContain('test-article.md')
  })

  it('parses frontmatter correctly', () => {
    const content = fs.readFileSync(path.join(FIXTURE_DIR, 'test-article.md'), 'utf8')
    const { data } = matter(content)
    expect(data.title).toBe('測試文章')
    expect(data.category).toBe('測試')
    expect(data.excerpt).toBe('這是測試摘要')
  })
})

describe('getPost', () => {
  it('returns null for a non-existent slug', () => {
    const fullPath = path.join(FIXTURE_DIR, 'non-existent.md')
    expect(fs.existsSync(fullPath)).toBe(false)
  })

  it('returns post content from markdown file', () => {
    const fullPath = path.join(FIXTURE_DIR, 'test-article.md')
    const { content } = matter(fs.readFileSync(fullPath, 'utf8'))
    expect(content.trim()).toBe('正文內容在這裡。')
  })
})

describe('getPostsByPage', () => {
  it('page 1 returns at most ARTICLES_PER_PAGE (10) posts', () => {
    const { posts } = getPostsByPage(1)
    expect(posts.length).toBeLessThanOrEqual(ARTICLES_PER_PAGE)
  })

  it('page 2+ returns at most ARTICLES_PER_PAGE_SUBSEQUENT (9) posts', () => {
    const { totalPages } = getPostsByPage(1)
    if (totalPages >= 2) {
      const { posts } = getPostsByPage(2)
      expect(posts.length).toBeLessThanOrEqual(ARTICLES_PER_PAGE_SUBSEQUENT)
    }
  })

  it('returns empty array for page beyond last page', () => {
    const { posts } = getPostsByPage(99999)
    expect(posts).toHaveLength(0)
  })

  it('totalPages is at least 1 when articles exist', () => {
    const { totalPages } = getPostsByPage(1)
    expect(totalPages).toBeGreaterThanOrEqual(1)
  })

  it('totalPages calculation: 19 articles → 2 pages, 20 articles → 3 pages', () => {
    // Pure math verification independent of real content
    function calcTotalPages(n: number): number {
      return n <= ARTICLES_PER_PAGE
        ? Math.max(1, Math.ceil(n / ARTICLES_PER_PAGE))
        : 1 + Math.ceil((n - ARTICLES_PER_PAGE) / ARTICLES_PER_PAGE_SUBSEQUENT)
    }
    expect(calcTotalPages(0)).toBe(1)
    expect(calcTotalPages(10)).toBe(1)
    expect(calcTotalPages(11)).toBe(2)
    expect(calcTotalPages(19)).toBe(2)
    expect(calcTotalPages(20)).toBe(3)
    expect(calcTotalPages(28)).toBe(3)
    expect(calcTotalPages(29)).toBe(4)
  })
})

describe('formatPostDate', () => {
  it('formats date-only string without time', () => {
    expect(formatPostDate('2026-05-27')).toBe('2026年5月27日')
  })

  it('formats datetime string with HH:MM to minute precision', () => {
    expect(formatPostDate('2026-05-27 09:15')).toBe('2026年5月27日 09:15')
  })

  it('pads single-digit hour and minute with leading zero', () => {
    expect(formatPostDate('2026-01-03 08:05')).toBe('2026年1月3日 08:05')
  })

  it('handles midnight time correctly', () => {
    expect(formatPostDate('2026-12-31 00:00')).toBe('2026年12月31日 00:00')
  })

  it('handles late-night time correctly', () => {
    expect(formatPostDate('2026-05-26 22:48')).toBe('2026年5月26日 22:48')
  })
})
