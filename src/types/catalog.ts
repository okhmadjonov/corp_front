export type Sort = 'new' | 'popular'

export interface NamedItem {
  id: number
  name: string
}

export interface Tag extends NamedItem {
  slug: string
}

export interface Page<T> {
  items: T[]
  total: number
  limit: number
  offset: number
}

export interface ClothesCard {
  id: number
  name: string
  slug: string
  brand: string | null
  views_count: number
  gender: NamedItem
  season: NamedItem
  main_image: string | null
  min_price: string | null
}

export interface PatternCard {
  id: number
  name: string
  slug: string
  brand: string | null
  views_count: number
  price: string
  gender: NamedItem
  season: NamedItem
  preview_image: string | null
}


export interface VariantItem {
  id: number
  size: string
  color: string
  price: string
  stock_quantity: number
  sku: string
}

export interface GalleryImage {
  id: number
  url: string
  sort_order: number
  is_main: boolean
}

export interface LinkItem {
  id: number
  name: string
  slug: string
}

export interface ClothesDetail {
  id: number
  name: string
  slug: string
  description: string | null
  brand: string | null
  material: string | null
  views_count: number
  gender: NamedItem
  season: NamedItem
  tags: Tag[]
  variants: VariantItem[]
  images: GalleryImage[]
  patterns: LinkItem[]
}

export interface PatternFileItem {
  id: number
  url: string
  kind: 'preview' | 'download'
  file_type: 'image' | 'pdf'
  sort_order: number
  is_main: boolean
}

export interface PatternDetail {
  id: number
  name: string
  slug: string
  description: string | null
  brand: string | null
  material: string | null
  price: string
  views_count: number
  gender: NamedItem
  season: NamedItem
  tags: Tag[]
  files: PatternFileItem[]
  clothes: LinkItem[]
}