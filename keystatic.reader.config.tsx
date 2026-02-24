import { config, fields, collection } from '@keystatic/core';

// Separate config for READER ONLY - reads from Git files
export default config({
  storage: {
    kind: 'local',  // Always read from Git files on production
  },
  
  collections: {
    posts: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title (URL Slug)' } }),
        displayTitle: fields.text({
          label: 'Article Title (Display)',
          validation: { isRequired: false }, // Optional for backward compatibility
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
