import { getMedia } from '@/lib/content'
import MediaYearGrid from './MediaYearGrid'

export default function LnkYearGrid() {
  const media = getMedia().map(item => ({
    name: String(item.name ?? ''),
    id: String(item.id ?? ''),
    url: item.url,
    year: item.year ?? 0,
    type: item.type === 'image' ? 'photo' : 'video',
  }))

  return <MediaYearGrid media={media} />
}
