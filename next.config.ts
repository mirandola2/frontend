import type { NextConfig } from 'next'
import withMDX from '@next/mdx'

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    loader: 'custom',
    loaderFile: './lib/imagekit-loader.ts',
    unoptimized: true,
  },
  trailingSlash: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
}

export default withMDX()(nextConfig)
