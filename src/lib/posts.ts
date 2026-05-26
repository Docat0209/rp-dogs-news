import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Post, PostMeta } from '@/types/post'

const contentDir = path.join(process.cwd(), 'content/news')

function normalizeDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().split('T')[0]
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
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
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

export function getAllSlugs(): string[] {
  const files = fs.readdirSync(contentDir)
  return files.filter(f => f.endsWith('.md')).map(f => f.replace(/\.md$/, ''))
}
