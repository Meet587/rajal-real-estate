import type { Plugin, UploadCollectionSlug } from 'payload'
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import { v2 as cloudinary } from 'cloudinary'

import { cloudinaryAdapter } from './cloudinaryAdapter'

type CloudinaryStorageOptions = {
  collections: Partial<Record<UploadCollectionSlug, true>>
  enabled?: boolean
  folder?: string
}

export function cloudinaryStorage({
  collections,
  enabled = true,
  folder = 'rajal-realestate',
}: CloudinaryStorageOptions): Plugin {
  cloudinary.config({
    secure: true,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })

  const adapter = cloudinaryAdapter({ folder })

  return cloudStoragePlugin({
    collections: Object.fromEntries(
      Object.entries(collections).map(([slug]) => [
        slug,
        {
          adapter,
          disableLocalStorage: true,
          generateFileURL: ({ filename, prefix }) => {
            const base = filename.replace(/\.[^/.]+$/, '')
            const parts = [folder, prefix, base].filter(Boolean)
            const publicId = parts.join('/')

            return cloudinary.url(publicId, { secure: true })
          },
        },
      ]),
    ),
    enabled,
  })
}
