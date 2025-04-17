export const dynamic = 'force-dynamic';

import { getDb } from "@/lib/mongodb";
import { redirect } from "next/navigation";

export default async function RedirectPage({ params }: { params: { alias: string } }) {
    const db = await getDb();
    console.log(params.alias)
    const found = await db.collection("urls").findOne({ alias: params.alias });
    console.log(found)
    if (!found) {
        return <div className="p-8 text-red-500">Alias not found</div>;
    }

    redirect(found.url);
}