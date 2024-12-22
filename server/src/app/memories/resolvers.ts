import prisma from "../../clients/db";
import { GraphqlContext } from "../../interface";
import { v2 as cloudinary } from "cloudinary";

const queryresolvers = {
  getAllMedia: async (_: any, __: any, context: GraphqlContext) => {
    if (!context.user) {
      throw new Error("Not authenticated");
    }
    try {
      const results = await cloudinary.search
        .expression(`folder:${context.user.id}/*`)
        .with_field("tags")
        .sort_by("created_at", "desc") // Sort by creation date in descending order
        .max_results(500) // Limit to 500 results
        .execute();
      // console.log(results.resources);
      return results.resources;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  getMediaByTags: async (
    _: any,
    { tags }: { tags: string[] },
    context: GraphqlContext
  ) => {
    if (!context.user) {
      throw new Error("Not authenticated");
    }
    try {
      // console.log("hekljasdlkfadsfa")
      const results = await cloudinary.search
        .expression(`folder:${context.user.id}/* AND tags=${tags.join(",")}`)
        .with_field("tags")
        .sort_by("created_at", "desc") // Sort by creation date in descending order
        .max_results(500) // Limit to 500 results
        .execute();
      return results.resources;
    } catch (err) {
      console.log(err);
    }
  },
  getAlbumMedia: async (
    _: any,
    { albumName }: { albumName: string },
    context: GraphqlContext
  ) => {
    if (!context.user) {
      throw new Error("Not authenticated");
    }
    try {
      const results = await cloudinary.search
        .expression(`public_id:${context.user.id}/${albumName}/*`)
        .with_field("tags")
        .sort_by("created_at", "desc") 
        .max_results(500) 
        .execute();
      return results.resources;
    } catch (err) {
      console.log(err);
    }
  },

  getAllAlbums: async (_: any, __: any, context: GraphqlContext) => {
    if (!context.user) {
      throw new Error("Not authenticated");
    }
    try {
      const results = await cloudinary.api.sub_folders(`${context.user.id}/`, {
        max_results: 500,
      });
      return results.folders;
    } catch (err) {
      console.log(err);
    }
  },
};
// cloudinary.search.expression("folder=cats").execute()

export const mutationResolvers = {
  markAsFavorite: (
    _: any,
    {
      publicId,
      markAsFavourite,
    }: { publicId: string; markAsFavourite: Boolean },
    context: GraphqlContext
  ) => {
    if (!context.user) {
      throw new Error("Not authenticated");
    }
    try {
      if (markAsFavourite)
        cloudinary.uploader.add_tag("favourites", [publicId]);
      else cloudinary.uploader.remove_tag("favourites", [publicId]);

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  createAlbum: async (
    _: any,
    { title }: { title: string },
    context: GraphqlContext
  ) => {
    if (!context.user) {
      throw new Error("Not authenticated");
    }
    try {
      const results = await cloudinary.api.create_folder(
        `/${context.user.id}/${title}`
      );
      return results;
    } catch (err) {
      console.log(err);
    }
  },
  deleteAlbum: async (
    _: any,
    { name }: { name: string },
    context: GraphqlContext
  ) => {
    if (!context.user) {
      throw new Error("Not authenticated");
    }
    try {
      await cloudinary.api.delete_resources_by_prefix(
        `${context.user.id}/${name}/`
      );
      const results = await cloudinary.api.delete_folder(
        `/${context.user.id}/${name}`
      );
      console.log("Deleted album", results);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  addToAlbum: async (
    _: any,
    { albumName, publicIds }: { albumName: string; publicIds: string[] },
    context: GraphqlContext
  ) => {
    if (!context.user) {
      throw new Error("Not authenticated");
    }
    try {
      const album = await prisma.albums.findUnique({
        where: {
          title: albumName,
        },
      });
      if (album) {
        for (const publicId of publicIds) {
          await cloudinary.uploader.upload(publicId, {
            folder: `${context.user.id}/${album.title}`,
          });
        }
        return true;
      } else {
        const album = await prisma.albums.create({
          data: {
            title: albumName,
            userId: context.user.id,
          },
        });
        for (const publicId of publicIds) {
          await cloudinary.uploader.upload(publicId, {
            folder: `${context.user.id}/${album.title}`,
          });
        }
        return true;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  },
};

export const resolvers = { queryresolvers, mutationResolvers };
