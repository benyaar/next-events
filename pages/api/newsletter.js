import { connectToDatabase } from "../../helpers/mongodb";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const email = req.body.email
        if (!email || !email.includes('@')) {
            res.status(422).json({ message: 'Invalid email adress' })
            return;
        }
        const { db } = await connectToDatabase()
        await db.collection('email').insertOne({email})
        res.status(201).json({ message: 'Signed up!' })
    }
}