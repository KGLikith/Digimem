import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  let attempts = 0;
  const maxAttempts = 3;
  const { url, publicId, folder } = await request.json();

  const uploadOptions: Record<string, string | boolean | Array<string>> = {};

  if (typeof publicId === "string") {
    uploadOptions.public_id = publicId;
    uploadOptions.invalidate = true;
  } else {
    uploadOptions.folder = folder;
    uploadOptions.tags=[
      'creations'
    ]
  }
  
  while (attempts < maxAttempts) {
    try {
      const results = await cloudinary.uploader.upload(url, uploadOptions);
      return Response.json({ results });
    } catch (err) {
      attempts++;
      if(attempts<maxAttempts) continue;
      return new Response(JSON.stringify({ error: (err as Error).message }), { status: 500 });
    }
  }
}
