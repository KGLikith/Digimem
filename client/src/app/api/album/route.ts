import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const { publicIds, albumName, userId } = await request.json();
    console.log("publicIds", publicIds);
    console.log("albumName", albumName);
    console.log("userId", userId);
    const result = await cloudinary.api.create_folder(
      `/${userId}/${albumName}`
    );
    const results = [];
    for (const publicId of publicIds) {
      const fileName = publicId.split("/").pop();
      const result = await cloudinary.uploader.rename(
        publicId,
        `${userId}/${albumName}/${fileName}`,{
          overwrite: true
        }
      );
      results.push(result);
    }
    return Response.json({ results });
  } catch (error) {
    console.error("Error moving files:", error);
    return Response.json(
      { error: "Failed to move files", details: (error as Error).message },
      { status: 500 }
    );
  }
}
