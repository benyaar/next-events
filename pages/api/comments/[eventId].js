import { connectToDatabase } from "../../../helpers/mongodb";

export default async function handler(req, res) {
    const eventId = req.query.eventId
    if (req.method === 'POST') {
        const { email, name, text } = req.body
        if (!email || !email.includes('@') || !name || !text) {
            res.status(422).json({ message: 'Invalid input' })
            return;
        }

        const newComment = {
            email, name, text, eventId
        }

        const { db } = await connectToDatabase()
        const result = await db.collection('comments').insertOne(newComment)
        newComment.id = result.insertedId
        res.status(201).json({ message: 'Added comment', comment: newComment })
    }

    if (req.method === 'GET') {
        const documents = await db
            .collection('comments')
            .find()
            .sort({ _id: -1 })
            .toArray();

        res.status(200).json({ comments: documents })
    }
}