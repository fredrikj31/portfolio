import { SanityWebhookSchema } from "./schemas";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

export async function POST(req: NextRequest) {
  const sanityWebhookSecret = process.env.SANITY_WEBHOOK_SECRET;
  const { isValidSignature, body } = await parseBody<{ _type: string }>(req, sanityWebhookSecret);

  if (!isValidSignature) {
    console.error("Request signature is invalid");
    return new Response(
      JSON.stringify({
        code: "invalid-signature",
        message: "The signature attached to the request is invalid",
      }),
      { status: 401 },
    );
  }

  if (!body?._type) {
    return new Response(
      JSON.stringify({
        code: "body-missing-type",
        message: "Request body was missing type",
      }),
      { status: 400 },
    );
  }

  const parsedBody = SanityWebhookSchema.safeParse(body);
  if (!parsedBody.success) {
    console.error("Request body was in invalid format");
    return new Response(
      JSON.stringify({
        code: "body-invalid-format",
        message: "Request body was in invalid format",
      }),
      { status: 400 },
    );
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
      revalidatePath("/sitemap.xml");
      revalidatePath("/projects");
      revalidatePath(`/projects/${requestBody.slug.current}`, "page");
      break;
    case "blogSeries":
      revalidatePath(`/blog/series/${requestBody.slug.current}`);
    case "blogPost":
      revalidatePath("/");
      revalidatePath("/sitemap.xml");
      revalidatePath("/blog");
      revalidatePath(`/blog/${requestBody.slug.current}`, "page");
      break;
  }

  return new Response(
    JSON.stringify({
      code: "revalidate-success",
      message: "Revalidated paths successfully",
    }),
    { status: 200 },
  );
}
