import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

type Preferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

function isPreferences(x: unknown): x is Preferences {
  if (!x || typeof x !== "object") return false;
  const r = x as Record<string, unknown>;
  return (
    r.necessary === true &&
    typeof r.analytics === "boolean" &&
    typeof r.marketing === "boolean"
  );
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as unknown;
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }

    const r = body as Record<string, unknown>;
    const userId = typeof r.userId === "string" ? r.userId : null;
    const version = typeof r.version === "string" ? r.version : "1.0";
    const preferences = r.preferences;

    if (!isPreferences(preferences)) {
      return NextResponse.json({ error: "Invalid preferences" }, { status: 400 });
    }

    await prisma.gdpr.create({
      data: {
        userId,
        version,
        preferences,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 },
    );
  }
}

