// app/api/requirements/route.ts
import { NextRequest, NextResponse } from "next/server";

type ExtractOut = {
  techRequirements: string[];
  generalRequirements: string[];
  error?: string;
};

export const runtime = "nodejs"; // ensure Node runtime if your project defaults to edge

export async function POST(req: NextRequest) {
  const { url } = (await req.json()) as { url?: string };
  if (!url || typeof url !== "string") {
    return NextResponse.json({ error: "Missing or invalid 'url'." }, { status: 400 });
  }

  try {
    const r = await fetch(`${process.env.PY_BACKEND_URL}/extract`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    if (!r.ok) {
      const text = await r.text();
      return NextResponse.json({ error: `Backend ${r.status}: ${text}` }, { status: 502 });
    }

    const data: ExtractOut = await r.json();
    if (!Array.isArray(data?.techRequirements) || !Array.isArray(data?.generalRequirements)) {
      return NextResponse.json({ error: "Unexpected response shape." }, { status: 502 });
    }

    return NextResponse.json(data);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Proxy error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
