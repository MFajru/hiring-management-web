import {
  cloudinariPublicApiKey,
  cloudinaryApiSecret,
  cloudinaryCloudName,
} from "@/lib/environment";
import { v2 as cloudinary } from "cloudinary";

// Config our cloudinary instance

cloudinary.config({
  cloud_name: cloudinaryCloudName,
  api_key: cloudinariPublicApiKey,
  api_secret: cloudinaryApiSecret,
});

export async function POST(request: Request) {
  const body = await request.json();

  const { paramsToSign } = body;

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    cloudinaryApiSecret as string
  );

  return Response.json({ signature });
}
