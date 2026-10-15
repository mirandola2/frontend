import type { MDXComponents } from 'mdx/types'
import Staff from '@/components/mdx/Staff'
import Fig from '@/components/mdx/Fig'
import TableOfContents from '@/components/mdx/TableOfContents'
import Cards from '@/components/mdx/Cards'
import Card from '@/components/mdx/Card'
import Quoted from '@/components/mdx/Quoted'
import Lnk from '@/components/mdx/Lnk'
import LnkYearGrid from '@/components/mdx/LnkYearGrid'
import Alci from '@/components/mdx/Alci'
import Morse from '@/components/mdx/Morse'
import CodiceSocio from '@/components/mdx/CodiceSocio'
import GroupSize from '@/components/mdx/GroupSize'
import MyDiv from '@/components/mdx/MyDiv'
import MdxImage from '@/components/mdx/MdxImage'
import ImageLink from '@/components/mdx/ImageLink'

export function useMDXComponents(): MDXComponents {
  return {
    img: MdxImage,
    Staff,
    Fig,
    TableOfContents,
    Cards,
    Card,
    Quoted,
    Lnk,
    LnkYearGrid,
    Alci,
    Morse,
    CodiceSocio,
    GroupSize,
    MyDiv,
    ImageLink,
  }
}
