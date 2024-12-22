"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutations = void 0;
exports.mutations = `
    markAsFavorite(publicId: String!,markAsFavourite: Boolean!): Boolean
    createAlbum(title: String!): Album
    deleteAlbum(name: String!): Boolean
    addToAlbum(albumName: String!,publicId: [String]!): Boolean
`;
