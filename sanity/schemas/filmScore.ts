import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'filmScore',
  title: 'Music - Film Scoring',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image (Optional)',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Not needed - video will auto-play',
    }),
    defineField({
      name: 'videoFile',
      title: 'Video File (Upload)',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      description: 'Upload a video file directly to Sanity. Use this OR Video URL below, not both.',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL (External)',
      type: 'url',
      description: 'YouTube, Vimeo, or other video URL. Use this OR Video File above, not both.',
      validation: (Rule) =>
        Rule.custom((videoUrl, context) => {
          const videoFile = (context.document as any)?.videoFile
          if (!videoUrl && !videoFile) {
            return 'Either Video File or Video URL is required'
          }
          if (videoUrl && videoFile) {
            return 'Please use either Video File or Video URL, not both'
          }
          return true
        }),
    }),
    defineField({
      name: 'platform',
      title: 'Video Platform',
      type: 'string',
      options: {
        list: [
          { title: 'YouTube', value: 'youtube' },
          { title: 'Vimeo', value: 'vimeo' },
          { title: 'Other', value: 'other' },
        ],
      },
      description: 'Only required if using Video URL',
      hidden: ({ document }) => !!document?.videoFile,
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.min(1900).max(new Date().getFullYear() + 1),
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish Date',
      type: 'date',
      description: 'Date the project was published or released',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'year',
      media: 'thumbnail',
    },
  },
})
