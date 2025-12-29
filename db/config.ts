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
    developer: column.json({ optional: true }),
    director: column.json({ optional: true }),
    author: column.json({ optional: true }),
    artist: column.json({ optional: true }),
    genre: column.json({ optional: true }),
    coverImage: column.text({ optional: true }),
    spineImage: column.text({ optional: true })
  }
})

export default defineDb({
  tables: { Media }
});
