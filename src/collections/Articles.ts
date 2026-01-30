import type { CollectionConfig } from "payload";

export const Articles: CollectionConfig = {
    slug: "articles",
    admin: {
        useAsTitle: "title",
    },
    fields: [
        {
            name: "title",
            type: "text",
            required: true,
        },
        {
            name: "slug",
            type: "text",
            unique: true,
            required: true,
        },
        {
            name: "type",
            type: "select",
            options: [
                { label: "News", value: "news" },
                { label: "Product", value: "product" },
                { label: "Insight", value: "insight" },
            ],
            required: true,
        },
        {
            name: "seo",
            type: "group",
            fields: [
                { name: "metaTitle", type: "text" },
                { name: "metaDescription", type: "textarea" },
            ],
        },
        {
            name: "sections",
            type: "blocks",
            blocks: [
                {
                    slug: "hero",
                    fields: [
                        { name: "title", type: "text", required: true },
                        { name: "lead", type: "textarea" },
                    ],
                },
                {
                    slug: "richText",
                    fields: [
                        {
                            name: "content",
                            type: "richText",
                        },
                    ],
                },
                {
                    slug: "cta",
                    fields: [
                        { name: "title", type: "text" },
                        { name: "buttonText", type: "text" },
                        { name: "href", type: "text" },
                    ],
                },
            ],
        },
    ],
};
