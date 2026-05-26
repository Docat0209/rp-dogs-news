import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Post, PostMeta } from '@/types/post'

const contentDir = path.join(process.cwd(), 'content/news')

function normalizeDate(value: unknown): string {
  if (value instanceof Date) {
    // YAML auto-parsed a bare date — convert to "YYYY-MM-DD HH:MM" local-style string
    const iso = value.toISOString()
    return iso.replace('T', ' ').slice(0, 16)
  }
  return String(value)
}

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(contentDir)
  return files
    .filter(f => f.endsWith('.md'))
    .map(filename => {
      const slug = filename.replace(/\.md$/, '')
      const { data } = matter(fs.readFileSync(path.join(contentDir, filename), 'utf8'))
      return {
        slug,
        title: data.title as string,
        date: normalizeDate(data.date),
        excerpt: data.excerpt as string,
        category: (data.category as string) || '新聞',
        cover: data.cover as string | undefined,
        author: (data.author as string) || '編輯部',
      }
    })
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getPost(slug: string): Post | null {
  try {
    const fullPath = path.join(contentDir, `${slug}.md`)
    const { data, content } = matter(fs.readFileSync(fullPath, 'utf8'))
    return {
      slug,
      title: data.title as string,
      date: normalizeDate(data.date),
      excerpt: data.excerpt as string,
      category: (data.category as string) || '新聞',
      cover: data.cover as string | undefined,
      author: (data.author as string) || '編輯部',
      content,
    }
  } catch {
    return null
  }
}

export const ARTICLES_PER_PAGE = 10

export function getPostsByPage(page: number): { posts: PostMeta[]; totalPages: number } {
  const all = getAllPosts()
  const totalPages = Math.max(1, Math.ceil(all.length / ARTICLES_PER_PAGE))
  const start = (page - 1) * ARTICLES_PER_PAGE
  return { posts: all.slice(start, start + ARTICLES_PER_PAGE), totalPages }
}

export function getAllSlugs(): string[] {
  const files = fs.readdirSync(contentDir)
  return files.filter(f => f.endsWith('.md')).map(f => f.replace(/\.md$/, ''))
}

/** Format a stored date string ("YYYY-MM-DD HH:MM" or "YYYY-MM-DD") for display */
export function formatPostDate(dateStr: string): string {
  const [datePart, timePart] = dateStr.split(' ')
  const [year, month, day] = datePart.split('-').map(Number)
  const dateLabel = `${year}年${month}月${day}日`
  if (!timePart) return dateLabel
  const [hour, minute] = timePart.split(':').map(Number)
  const h = String(hour).padStart(2, '0')
  const m = String(minute).padStart(2, '0')
  return `${dateLabel} ${h}:${m}`
}
