import { getMedia } from '@/lib/content'
import MediaYearGrid from './MediaYearGrid'

export default function LnkYearGrid() {
  const media = getMedia().map(item => ({
    name: item.title,
    url: item.url,
    id: item.id,
    year: item.year ?? 0,
    type: item.type === 'image' ? 'photo' : 'video',
  }))

  return <MediaYearGrid media={media} />
}
