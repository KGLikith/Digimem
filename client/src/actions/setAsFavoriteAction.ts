import { apolloClient } from "@/clients/Apollo";
import queryclient from "@/clients/queryClient";
import { markAsFavoriteMutation } from "@/graphql/mutation/media";
import { useGetMediaByTags } from "@/hooks/media";
import { toast } from "@/hooks/use-toast";

export async function setAsFavoriteAction(
  publicId: string,
  setFavourite: boolean,
  setIsFavorited: (liked: boolean) => void,
  isFavourited: boolean
) {
  const { errors } = await apolloClient.mutate({
    mutation: markAsFavoriteMutation,
    variables: {
      publicId,
      markAsFavourite: setFavourite,
    },
  });

  if (errors) {
    return toast({
      variant: "destructive",
      description: errors[0].message,
      duration: 1000,
    });
  }
  await new Promise((resolve) => setTimeout(resolve, 3000));
  await apolloClient.resetStore();
  await queryclient.invalidateQueries({
    queryKey: ["MediaByTags", ["favourites"]],
  });
  await queryclient.invalidateQueries({
    queryKey: ["AllMedia"],
  });
  await queryclient.invalidateQueries({
    queryKey: ["MediaByTags", ["creations"]],
  });
  await queryclient.invalidateQueries({
    queryKey: ["MediaByTags", ["uploads"]],
  });
  // toast({
  //   description: "done "
  // })
  // revalidatePath('/media/favourites')
}
