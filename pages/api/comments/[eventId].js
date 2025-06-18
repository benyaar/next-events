import { connectToDatabase } from "../../../helpers/mongodb";

export default async function handler(req, res) {
    const eventId = req.query.eventId
    const { db } = await connectToDatabase()
    if (req.method === 'POST') {
        const { email, name, text } = req.body
        if (!email || !email.includes('@') || !name || !text) {
            res.status(422).json({ message: 'Invalid input' })
            return;
        }

        const newComment = {
            email, name, text, eventId
        }
        try {

            const result = await db.collection('comments').insertOne(newComment)
            newComment.id = result.insertedId
            res.status(201).json({ message: 'Added comment', comment: newComment })
            return
        } catch (error) {
            res.status(500).json({ message: 'Failed insert' })
            return
        }

    }

    if (req.method === 'GET') {
        try {
            const documents = await db
                .collection('comments')
                .find()
                .sort({ _id: -1 })
                .toArray();

            res.status(200).json({ comments: documents })
            return
        } catch (error) {
            res.status(500).json({ message: 'Failed get data' })
            return
        }

    }
}