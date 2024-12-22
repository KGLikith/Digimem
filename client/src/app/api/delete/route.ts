import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  const {  publicId } = await request.json();

 
//   console.log("uploadOptions",uploadOptions)
  const results = await cloudinary.api.delete_resources([...publicId])
  
//   console.log("results",results)
  return Response.json({ results });
}
