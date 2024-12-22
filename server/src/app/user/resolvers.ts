import prisma from "../../clients/db";
import { GraphqlContext } from "../../interface";
import UserService from "../services/user";

const queryResolver = {

  verifyUser: async (
    _: any,
    {
      email,
      firstName,
      lastName,
      profileImageUrl,
    }: {
      email: string;
      firstName: string;
      lastName: string;
      profileImageUrl: string;
    },
    __: any
  ) => {
    return await UserService.verifyUser(
      email,
      firstName,
      lastName,
      profileImageUrl
    );
  },

  currentUser: async(_: any, __: any, context: GraphqlContext) => {
    const id = context.user?.id;
    if (!id) return;
    const user = await UserService.getUserbyId(id);
    return user;
  },

  currentUserByEmail: async (_: any, args: any, context: GraphqlContext) => {
    const id = context.user?.id;
    if (!id) return;
    const user = await UserService.getUserbyId(id);
    // console.log("user", user);
    return user;
  },
  
  currentUserById: async (_: any, { id }: { id: string }, __: any) => {
    return await UserService.getUserbyId(id);
  },
};

const mutationResolver = {
  addUser: async (
    parent: any,
    props: {
      email: string;
      firstName: string;
      lastName: string;
      profileImageUrl: string;
    },
    context: any
  ) => {
    return await prisma.user.create({
      data: {
        email: props.email,
        FirstName: props.firstName,
        LastName: props.lastName,
        profileImage: props.profileImageUrl,
      },
    });
  },
};

export const resolvers = { queryResolver, mutationResolver };
