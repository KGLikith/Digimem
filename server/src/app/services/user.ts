import prisma from "../../clients/db";
import JWTService from "./jwt";

export default class UserService {
  public static async getUserbyId(id: string) {
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  public static async getUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  public static async verifyUser(
    email: string,
    firstName: string,
    lastName: string,
    profileImageUrl: string
  ) {
    const user = await this.getUserByEmail(email);

    if (!user) {
      const data = await prisma.user.create({
        data: {
          email: email,
          FirstName: firstName,
          LastName: lastName,
          profileImage: profileImageUrl,
        },
      });
      const UserToken = await JWTService.generateJWT(data);
      return UserToken;
    }

    const UserToken = await JWTService.generateJWT(user);
    return UserToken;
  }


//   public static async addUser(
//     email: string,
//     firstName: string,
//     lastName: string,
//     profileImageUrl: string
//   ) {
//     const user = await this.getUserByEmail(email);

//     if (user) {
//       return user;
//     }

//     const data = await prisma.user.create({
//       data: {
//         email: email,
//         FirstName: firstName,
//         LastName: lastName,
//         profileImage: profileImageUrl,
//       },
//     });
//   }
}
