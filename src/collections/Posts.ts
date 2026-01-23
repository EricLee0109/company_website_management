import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { convertLexicalToHTML } from "@payloadcms/richtext-lexical/html";
import type { CollectionConfig, RichTextField } from "payload";

const contentField: RichTextField = {
  name: 'content',
  type: 'richText',
  localized: true,
  // editor: lexicalEditor({
  //   features: ({ defaultFeatures }) => [
  //     ...defaultFeatures,
  //   ],
  // }),
}


export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', unique: true, index: true, required: true, localized: true },
    contentField,
    {
      name: 'contentHtml',
      type: 'textarea',
      admin: {
        readOnly: true,
        components: {
          Field: '/components/ContentHtmlField',
        },
      }
    },
    { name: 'author', type: 'relationship', relationTo: 'users' },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    { name: 'tags', type: 'select', hasMany: true, options: ['technology', 'business', 'marketing', 'design', 'development'] },
    { name: 'status', type: 'select', options: ['draft', 'published', 'archived'] },
    { name: 'publishedAt', type: 'date' },
    { name: 'views', type: 'number', defaultValue: 0 },
    { name: 'likes', type: 'number', defaultValue: 0 },
    // { name: 'category', type: 'relationship', relationTo: 'categories', hasMany: true },
  ],
  hooks: {
    afterRead: [
      ({ doc }) => {
        if (!doc?.content) return doc;
        doc.contentHtml = convertLexicalToHTML({
          data: doc?.content || {},
        })
        return doc;
      },
    ],
  },
  timestamps: true,
}