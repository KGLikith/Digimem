import { apolloClient } from "@/clients/Apollo";
import queryclient from "@/clients/queryClient";
import { CloudinaryResource } from "@/components/_components/Media/MediaGallery";
import { Media } from "@/gql/graphql";
import { getAlbumMediaQuery, getAllAlbumsQuery, getAllMediaQuery, getMediaByTagsQuery } from "@/graphql/queries/media";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface GetAllMediaProps {
  disableFetch?: boolean;
}
interface MediaByTagsProps {
  getMediaByTags: Media[];
}
interface DataProps {
  getAllMedia: Media[];
}

export const getAllAlbums = ()=>{
  const query = useQuery({
    queryKey: ["AllAlbums"],
    queryFn: async () => {
      try {
        const { data } = await apolloClient.query({
          query: getAllAlbumsQuery,
        });
        console.log(data)
        return data;
      } catch (err) {
        console.log("error", err);
      }
    },
  });
  return {...query, albums: query.data?.getAllAlbums};
}

export const useGetAlbumMedia=(albumName: string)=>{
  const query = useQuery({
    queryKey: ["AlbumMedia", albumName],
    queryFn: async () => {
      try {
        const { data } = await apolloClient.query({
          query: getAlbumMediaQuery,
          variables: {
            albumName
          },
        });
        return data;
      } catch (err) {
        console.log("error", err);
      }
    },
  })
  return {...query, media: query.data?.getAlbumMedia}
}

export const useGetAllMedia = (options?: GetAllMediaProps) => {
  const queryclient = useQueryClient();

  const query = useQuery({
    queryKey: ["AllMedia"],
    queryFn: async () => {
      try {
        const { data } = await apolloClient.query({
          query: getAllMediaQuery,
        });
        return data;
      } catch (err) {
        console.log("error", err);
      }
    },
    staleTime: 1000 * 10,
  });

  async function addResources(results: Array<CloudinaryResource>) {
    try {
      queryclient.setQueryData(["AllMedia"], (data: DataProps) => {
        return {
          getAllMedia: [...results, ...(data?.getAllMedia || [])],
        };
      });
      queryclient.setQueryData(
        ["MediaByTags", ["creations"]],
        (data: DataProps) => {
          return {
            getAllMedia: [...results, ...(data?.getAllMedia || [])],
          };
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function removeResources(publicIds: Array<String>) {
    try {
      queryclient.setQueryData(["AllMedia"], (data: DataProps) => {
        return {
          getAllMedia: [
            ...(data?.getAllMedia.filter(
              (d) => !publicIds.includes(d.public_id)
            ) || []),
          ],
        };
      });
      queryclient.setQueryData(["MediaByTags"], (data: DataProps) => {
        return {
          getAllMedia: [
            ...(data?.getAllMedia.filter(
              (d) => !publicIds.includes(d.public_id)
            ) || []),
          ],
        };
      });
    } catch (err) {
      console.log(err);
    }
  }

  return {
    ...query,
    media: query.data?.getAllMedia,
    addResources,
    removeResources,
  };
};

export const useGetMediaByTags = (tags?: string[]) => {
  const queryclient = useQueryClient();

  const query = useQuery({
    queryKey: ["MediaByTags", tags],
    queryFn: async () => {
      try {
        const { data } = await apolloClient.query({
          query: getMediaByTagsQuery,
          variables: {
            tags,
          },
        });
        return data;
      } catch (err) {
        console.log("error", err);
      }
    },
    staleTime: 1000 * 10,
  });

  async function markAsFavorite(publicId: string, markAsFavourite: boolean) {
    try {
      if (!markAsFavourite) {
        queryclient.setQueryData(
          ["MediaByTags", ["favourites"]],
          (data: MediaByTagsProps) => {
            console.log(publicId)
            console.log(data.getMediaByTags);
            console.log([...data?.getMediaByTags.filter((d) => d.public_id !== publicId)])
            return {
              getMediaByTags: [
                ...data?.getMediaByTags.filter((d) => d.public_id !== publicId),
              ],
            };
          }
        );
      } else {
        queryclient.setQueryData(
          ["MediaByTags", ["favourites"]],
          (data: MediaByTagsProps) => {
            return {
              getMediaByTags: [...data?.getMediaByTags, publicId],
            };
          }
        );
      }
    } catch (err) {
      console.log(err);
    }
  }

  return { ...query, media: query.data?.getMediaByTags, markAsFavorite };
};

// export const useMarkAsFavorite = () => {
//   const muatation = useMutation({
//     mutationFn: async (variables: {
//       publicId: string;
//       markAsFavourite: boolean;
//     }) => {
//       try {
//         const { data } = await apolloClient.mutate({
//           mutation: markAsFavoriteMutation,
//           variables,
//         });

//         return data;
//       } catch (err) {
//         console.log(err);
//       }
//     },
//   });

//   return { ...muatation, markAsFavorite: muatation.data.markAsFavorite };
// };
