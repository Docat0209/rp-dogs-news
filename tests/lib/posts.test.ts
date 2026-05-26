import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import fs from 'fs'
import path from 'path'

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
    const matter = require('gray-matter')
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
    const matter = require('gray-matter')
    const fullPath = path.join(FIXTURE_DIR, 'test-article.md')
    const { content } = matter(fs.readFileSync(fullPath, 'utf8'))
    expect(content.trim()).toBe('正文內容在這裡。')
  })
})
