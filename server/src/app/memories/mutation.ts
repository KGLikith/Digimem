export const mutations=`
    markAsFavorite(publicId: String!,markAsFavourite: Boolean!): Boolean
    createAlbum(title: String!): Album
    deleteAlbum(name: String!): Boolean
    addToAlbum(albumName: String!,publicId: [String]!): Boolean
`