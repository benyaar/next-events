import { MongoClient } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI
console.log(MONGODB_URI);

let client
let clientPromise

if (!global._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI)
    global._mongoClientPromise = client.connect()
}
clientPromise = global._mongoClientPromise

export async function connectToDatabase() {
    const client = await clientPromise
    const db = client.db()
    return { client, db }
}