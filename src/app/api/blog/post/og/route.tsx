import { ImageResponse } from "next/og";

export async function GET(request: Request) {
  try {
    // ?title=<title>&tag=<tag>&tag=<tag>...
    const { searchParams } = new URL(request.url);

    const hasTitle = searchParams.has("title");
    const title = hasTitle ? searchParams.get("title") : "Amazing blog post🔥";
    const tags = searchParams.getAll("tag");

    // Getting assets from public assets folder
    const fontData = await fetch(`${process.env.HOST}/assets/fonts/COUR.woff`).then((res) => res.arrayBuffer());
    const imageData = await fetch(`${process.env.HOST}/assets/images/me.jpg`).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "#FFFFFF",
            padding: "112.5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "100%",
              height: "100%",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <span style={{ fontSize: "48px" }}>Blog</span>
                <div style={{ border: "2px solid black" }} />
                <span style={{ fontSize: "84px" }}>{title}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "12px" }}>
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    style={{
                      padding: "6px 9px 6px 9px",
                      backgroundColor: "#000000",
                      fontSize: "37.5px",
                      color: "#FFFFFF",
                      borderRadius: "6px",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "18px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={"Picture of Fredrik Johansen"}
                src={imageData as unknown as string}
                height={187.5}
                width={187.5}
                style={{ borderRadius: "50%" }}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <span style={{ fontSize: "48px" }}>Fredrik Johansen</span>
                <span style={{ fontSize: "36px" }}>Self-Taught Software Developer</span>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1800,
        height: 945,
        // debug: true,
        fonts: [
          {
            name: "monospace",
            data: fontData,
            style: "normal",
          },
        ],
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
