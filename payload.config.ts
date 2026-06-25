import path from 'path'
import { fileURLToPath } from 'url'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Media } from './src/collections/Media'
import { Users } from './src/collections/Users'
import { cloudinaryStorage } from './src/storage/cloudinaryStorage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname, 'src'),
    },
  },
  collections: [Users, Media],
  plugins: [
    cloudinaryStorage({
      collections: {
        media: true,
      },
      folder: process.env.CLOUDINARY_FOLDER || 'rajal-realestate',
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    migrationDir: path.resolve(dirname, 'src/migrations'),
  }),
  sharp,
})
