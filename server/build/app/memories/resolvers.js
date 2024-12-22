"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.mutationResolvers = void 0;
const db_1 = __importDefault(require("../../clients/db"));
const cloudinary_1 = require("cloudinary");
const queryresolvers = {
    getAllMedia: (_, __, context) => __awaiter(void 0, void 0, void 0, function* () {
        if (!context.user) {
            throw new Error("Not authenticated");
        }
        try {
            const results = yield cloudinary_1.v2.search
                .expression(`folder:${context.user.id}/*`)
                .with_field("tags")
                .sort_by("created_at", "desc") // Sort by creation date in descending order
                .max_results(500) // Limit to 500 results
                .execute();
            // console.log(results.resources);
            return results.resources;
        }
        catch (err) {
            console.log(err);
            return null;
        }
    }),
    getMediaByTags: (_1, _a, context_1) => __awaiter(void 0, [_1, _a, context_1], void 0, function* (_, { tags }, context) {
        if (!context.user) {
            throw new Error("Not authenticated");
        }
        try {
            // console.log("hekljasdlkfadsfa")
            const results = yield cloudinary_1.v2.search
                .expression(`folder:${context.user.id}/* AND tags=${tags.join(",")}`)
                .with_field("tags")
                .sort_by("created_at", "desc") // Sort by creation date in descending order
                .max_results(500) // Limit to 500 results
                .execute();
            return results.resources;
        }
        catch (err) {
            console.log(err);
        }
    }),
    getAlbumMedia: (_1, _a, context_1) => __awaiter(void 0, [_1, _a, context_1], void 0, function* (_, { albumName }, context) {
        if (!context.user) {
            throw new Error("Not authenticated");
        }
        try {
            const results = yield cloudinary_1.v2.search
                .expression(`public_id:${context.user.id}/${albumName}/*`)
                .with_field("tags")
                .sort_by("created_at", "desc")
                .max_results(500)
                .execute();
            return results.resources;
        }
        catch (err) {
            console.log(err);
        }
    }),
    getAllAlbums: (_, __, context) => __awaiter(void 0, void 0, void 0, function* () {
        if (!context.user) {
            throw new Error("Not authenticated");
        }
        try {
            const results = yield cloudinary_1.v2.api.sub_folders(`${context.user.id}/`, {
                max_results: 500,
            });
            return results.folders;
        }
        catch (err) {
            console.log(err);
        }
    }),
};
// cloudinary.search.expression("folder=cats").execute()
exports.mutationResolvers = {
    markAsFavorite: (_, { publicId, markAsFavourite, }, context) => {
        if (!context.user) {
            throw new Error("Not authenticated");
        }
        try {
            if (markAsFavourite)
                cloudinary_1.v2.uploader.add_tag("favourites", [publicId]);
            else
                cloudinary_1.v2.uploader.remove_tag("favourites", [publicId]);
            return true;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    },
    createAlbum: (_1, _a, context_1) => __awaiter(void 0, [_1, _a, context_1], void 0, function* (_, { title }, context) {
        if (!context.user) {
            throw new Error("Not authenticated");
        }
        try {
            const results = yield cloudinary_1.v2.api.create_folder(`/${context.user.id}/${title}`);
            return results;
        }
        catch (err) {
            console.log(err);
        }
    }),
    deleteAlbum: (_1, _a, context_1) => __awaiter(void 0, [_1, _a, context_1], void 0, function* (_, { name }, context) {
        if (!context.user) {
            throw new Error("Not authenticated");
        }
        try {
            yield cloudinary_1.v2.api.delete_resources_by_prefix(`${context.user.id}/${name}/`);
            const results = yield cloudinary_1.v2.api.delete_folder(`/${context.user.id}/${name}`);
            console.log("Deleted album", results);
            return true;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }),
    addToAlbum: (_1, _a, context_1) => __awaiter(void 0, [_1, _a, context_1], void 0, function* (_, { albumName, publicIds }, context) {
        if (!context.user) {
            throw new Error("Not authenticated");
        }
        try {
            const album = yield db_1.default.albums.findUnique({
                where: {
                    title: albumName,
                },
            });
            if (album) {
                for (const publicId of publicIds) {
                    yield cloudinary_1.v2.uploader.upload(publicId, {
                        folder: `${context.user.id}/${album.title}`,
                    });
                }
                return true;
            }
            else {
                const album = yield db_1.default.albums.create({
                    data: {
                        title: albumName,
                        userId: context.user.id,
                    },
                });
                for (const publicId of publicIds) {
                    yield cloudinary_1.v2.uploader.upload(publicId, {
                        folder: `${context.user.id}/${album.title}`,
                    });
                }
                return true;
            }
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }),
};
exports.resolvers = { queryresolvers, mutationResolvers: exports.mutationResolvers };
