"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queries = void 0;
exports.queries = `
    getAllMedia: [Media]
    getMediaByTags(tags: [String]!): [Media]
    getAllAlbums: [Album]
    getAlbumMedia(albumName:String!): [Media]
`;
