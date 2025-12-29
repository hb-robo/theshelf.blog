import { defineDb, defineTable, column } from 'astro:db';

const Media = defineTable({
  columns: {
    id: column.text({primaryKey: true}),
    title: column.text(),
    releaseDate: column.text(),
    shelfStatus: column.text({
      enum: ['owned', 'not-owned', 'digital-only'] 
    }),
    mediaType: column.text({
      enum: ['book', 'album', 'game', 'film']
    }),
    subtype: column.text({ optional: true }),
    creatives: column.json(),
    genre: column.json({ optional: true }),
    coverImage: column.text({ optional: true }),
    spineImage: column.text({ optional: true })
  }
})

export default defineDb({
  tables: { Media }
});
