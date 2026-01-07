import { MetadataRoute } from 'next'
import { SITEMAP_URL } from './lib/constants/urls'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: SITEMAP_URL,
  }
}
