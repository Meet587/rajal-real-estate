import type { Adapter, GeneratedAdapter } from '@payloadcms/plugin-cloud-storage/types'
import { v2 as cloudinary } from 'cloudinary'

type CloudinaryAdapterArgs = {
  folder: string
}

function getPublicId(filename: string, folder: string, prefix?: string): string {
  const base = filename.replace(/\.[^/.]+$/, '')
  const parts = [folder, prefix, base].filter(Boolean)

  return parts.join('/')
}

export function cloudinaryAdapter({ folder }: CloudinaryAdapterArgs): Adapter {
  return ({ prefix = '' }): GeneratedAdapter => ({
    name: 'cloudinary',

    generateURL: ({ filename, prefix: docPrefix = '' }) => {
      const publicId = getPublicId(filename, folder, docPrefix || prefix)

      return cloudinary.url(publicId, { secure: true })
    },

    handleUpload: async ({ data, file }) => {
      const publicId = getPublicId(file.filename, folder, data?.prefix || prefix)

      await new Promise<void>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            public_id: publicId,
            resource_type: 'auto',
            overwrite: true,
          },
          (error) => {
            if (error) {
              reject(error)
              return
            }

            resolve()
          },
        )

        uploadStream.end(file.buffer)
      })

      return data
    },

    handleDelete: async ({ doc, filename }) => {
      const publicId = getPublicId(filename, folder, doc?.prefix || prefix)

      await cloudinary.uploader.destroy(publicId, { resource_type: 'auto' })
    },

    staticHandler: (_req, { params: { filename, prefix: docPrefix } }) => {
      const publicId = getPublicId(filename, folder, docPrefix || prefix)
      const url = cloudinary.url(publicId, { secure: true })

      return Response.redirect(url, 302)
    },
  })
}
