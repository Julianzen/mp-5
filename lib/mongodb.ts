import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI!;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
    var _mongoClientPromise: Promise<MongoClient>;
}

if (!process.env.MONGO_URI) {
    throw new Error("Please define the MONGO_URI environment variable");
}

if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export async function getDb() {
    const client = await clientPromise;
    return client.db("url-shortener");
}