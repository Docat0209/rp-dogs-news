export interface PostMeta {
  slug: string
  title: string
  date: string
  excerpt: string
  category: string
  cover?: string
  author?: string
}

export interface Post extends PostMeta {
  content: string
}
