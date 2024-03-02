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
            padding: "75px",
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
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <span style={{ fontSize: "32px" }}>Blog</span>
                <div style={{ border: "2px solid black" }} />
                <span style={{ fontSize: "56px" }}>{title}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "8px" }}>
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    style={{
                      padding: "4px 6px 4px 6px",
                      backgroundColor: "#000000",
                      fontSize: "25px",
                      color: "#FFFFFF",
                      borderRadius: "4px",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "12px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={"Picture of Fredrik Johansen"}
                src={imageData as unknown as string}
                height={125}
                width={125}
                style={{ borderRadius: "50%" }}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <span style={{ fontSize: "32px" }}>Fredrik Johansen</span>
                <span style={{ fontSize: "24px" }}>Self-Taught Software Developer</span>
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
