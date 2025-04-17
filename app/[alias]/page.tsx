export const dynamic = 'force-dynamic';

import { getDb } from "@/lib/mongodb";
import { redirect } from "next/navigation";

interface Props {
  params: {
    alias: string;
  };
}
export default async function RedirectPage({ params }: { params: { alias: string } }) {
    const db = await getDb();
    const found = await db.collection("urls").findOne({ alias: params.alias });
    if (!found) {
        return <div className="p-8 text-red-500">Alias not found</div>;
    }

    redirect(found.url);
}
