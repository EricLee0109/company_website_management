import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { DatabaseAdapterResult } from 'node_modules/payload/dist/database/types'
import { Articles } from './collections/Articles'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'

// Payload, Next.js and Docker use this, if not docker build will occur error because not found File directory, it mean docker can not found Web API
const rootDir = process.cwd()

const isBuild =
  process.env.NEXT_PHASE === 'phase-production-build' ||
  process.env.PAYLOAD_BUILD === 'true'

// Keep the database connection not closed when the build is done
const buildTimeDB = {
  init: async () => { },
  destroy: async () => { },
} as unknown as DatabaseAdapterResult

export default buildConfig({
  localization: {
    locales: ['vi', 'en', 'ko', 'cn'],
    defaultLocale: 'vi',
    fallback: true,
  },

  admin: {
    user: Users.slug,
    importMap: {
      baseDir: rootDir,
    },
  },

  collections: [Users, Media, Posts, Articles],
  editor: lexicalEditor(),

  serverURL: process.env.SERVER_URL || '',
  secret: process.env.PAYLOAD_SECRET || 'build-secret',

  typescript: {
    outputFile: path.resolve(rootDir, 'payload-types.ts'),
  },

  db: isBuild
    ? buildTimeDB
    : mongooseAdapter({
      url: process.env.DATABASE_URI || '',
    }),

  sharp,
  cors: ['http://localhost:4000', 'https://tcss-company.vercel.app'],
  csrf: ['http://localhost:4000', 'https://tcss-company.vercel.app'],
  plugins: [],
})

