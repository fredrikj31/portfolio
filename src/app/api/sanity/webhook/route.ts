import { NextApiRequest, NextApiResponse } from "next";
import { SanityWebhookSchema } from "./schemas";
import { revalidatePath } from "next/cache";
import { readRequestBody } from "@/src/utils/readRequestBody";
import { SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { validateSanityWebhook } from "@/src/utils/validateSanityWebhook";

// Next.js will by default parse the body, which can lead to invalid signatures
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const signature = req.headers[SIGNATURE_HEADER_NAME];
  const body = await readRequestBody(req.body); // Read the body into a string
  const isSignatureValid = await validateSanityWebhook({ body, signature });

  if (!isSignatureValid) {
    console.error("Request signature is invalid");
    return res.status(401).send({
      code: "invalid-signature",
      message: "The signature attached to the request is invalid",
    });
  }

  const parsedBody = SanityWebhookSchema.safeParse(JSON.parse(body));
  if (!parsedBody.success) {
    console.error("Request body was in invalid format");
    return res.status(400).send({
      code: "body-invalid-format",
      message: "Request body was in invalid format",
    });
  }

  const requestBody = parsedBody.data;
  switch (requestBody._type) {
    case "about":
      revalidatePath("/about");
      break;
    case "resume":
      revalidatePath("/resume");
      break;
    case "testimonial":
      revalidatePath("/");
      revalidatePath("/testimonials");
      break;
    case "project":
      revalidatePath("/");
      revalidatePath("/portfolio");
      revalidatePath(`/portfolio/${requestBody.slug.current}`, "page");
      break;
    case "blogSeries":
      revalidatePath(`/blog/series/${requestBody.slug.current}`);
    case "blogPost":
      revalidatePath("/");
      revalidatePath("/blog");
      revalidatePath(`/blog/${requestBody.slug.current}`, "page");
      break;
  }

  return res.status(200).send({
    code: "revalidate-success",
    message: "Revalidated paths successfully",
  });
}
