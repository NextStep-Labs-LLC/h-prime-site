import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'cloud',
  },
  cloud: {
    project: 'h-prime/h-prime-site',
  },
  
  collections: {
    // Blog posts for SEO
    posts: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title (URL Slug)' } }),
        displayTitle: fields.text({
          label: 'Article Title (Display)',
          validation: { isRequired: true },
        }),
        description: fields.text({
          label: 'Meta Description',
          multiline: true,
          validation: { isRequired: true },
        }),
        publishedDate: fields.date({ 
          label: 'Published Date',
          defaultValue: { kind: 'today' },
        }),
        author: fields.text({ 
          label: 'Author', 
          defaultValue: 'H-Prime Appliance Repair Services',
        }),
        image: fields.image({
          label: 'Featured Image',
          directory: 'public/images/blog',
          publicPath: '/images/blog/',
        }),
        content: fields.markdoc({
          label: 'Content',
          options: {
            image: {
              directory: 'public/images/blog',
              publicPath: '/images/blog/',
            },
          },
        }),
      },
    }),
  },
});

