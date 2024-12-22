export const queries = `
    getAllMedia: [Media]
    getMediaByTags(tags: [String]!): [Media]
    getAllAlbums: [Album]
    getAlbumMedia(albumName:String!): [Media]
`