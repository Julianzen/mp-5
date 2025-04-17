import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { URL } from "url";

export async function POST(req: NextRequest) {
    const { alias, url } = await req.json();
    const db = await getDb();

    // Validate URL
    try {
        new URL(url);
    } catch {
        return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    const existing = await db.collection("urls").findOne({ alias });
    if (existing) {

        return NextResponse.json({ error: "Alias already exists" }, { status: 400 });
    }

    await db.collection("urls").insertOne({ alias, url });
    return NextResponse.json({ alias });
}
