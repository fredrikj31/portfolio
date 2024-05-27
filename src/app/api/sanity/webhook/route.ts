import { SanityWebhookSchema } from "./schemas";
import { revalidatePath } from "next/cache";
import { SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { validateSanityWebhook } from "@/src/utils/validateSanityWebhook";

export async function POST(req: Response) {
  const body = await req.json();
  const signature = req.headers.get(SIGNATURE_HEADER_NAME);
  const isSignatureValid = await validateSanityWebhook({ body, signature });

  if (!isSignatureValid) {
    console.error("Request signature is invalid");
    return new Response(
      JSON.stringify({
        code: "invalid-signature",
        message: "The signature attached to the request is invalid",
      }),
      { status: 401 },
    );
  }

  const parsedBody = SanityWebhookSchema.safeParse(req.body);
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

  return new Response(
    JSON.stringify({
      code: "revalidate-success",
      message: "Revalidated paths successfully",
    }),
    { status: 200 },
  );
}
