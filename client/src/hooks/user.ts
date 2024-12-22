import { apolloClient } from "@/clients/Apollo";
import { addUserMutation } from "@/graphql/mutation/user";
import {
  currentUserByEmailQuery,
  currentUserByIdQuery,
  currentUserQuery,
} from "@/graphql/queries/user";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
  const query = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      try {
        const { data } = await apolloClient.query({
          query: currentUserQuery,
        });
        return data;
      } catch (err) {
        console.error("error while fetching current user", err);
      }
    },
  });
  return { ...query, user: query.data?.currentUser };
};

export const useCurrentUserviaEmail = (email: string) => {
  const query = useQuery({
    queryKey: ["currentUser", email],
    queryFn: async () => {
      try {
        console.log("hook");
        if (!email) return null;
        const { data } = await apolloClient.query({
          query: currentUserByEmailQuery,
          variables: { email: email },
        });
        console.log("data", data);
        return data;
      } catch (err) {
        console.error("error while fetching current user", err);
      }
    },
  });
  return { ...query, user: query.data?.currentUserByEmail };
};

export const useCurrentUserById = (id: string | null) => {
  const query = useQuery({
    queryKey: ["currentUser", id],
    queryFn: async () => {
      try {
        if (id === "") return null;
        const { data } = await apolloClient.query({
          query: currentUserByIdQuery,
          variables: { id: id },
        });
        return data;
      } catch (err) {
        console.log("error while finding via id", err);
      }
    },
  });
  return { ...query, data: query.data?.currentUserById };
};

export const useAddUser = () => {
  const mutation = useMutation({
    mutationKey: ["addUser"],
    mutationFn: async ({
      email,
      firstName,
      lastName,
      profileImageUrl,
    }: {
      email: string;
      firstName: string;
      lastName: string;
      profileImageUrl: string;
    }) => {
      try {
        const { data } = await apolloClient.mutate({
          mutation: addUserMutation,
          variables: {
            email: email,
            firstName: firstName,
            lastName: lastName,
            profileImageUrl: profileImageUrl,
          },
        });
        return data;
      } catch (err) {
        console.error("error while fetching current user", err);
      }
    },
  });
  return { ...mutation, data: mutation.data };
};
