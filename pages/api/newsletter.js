import { connectToDatabase } from "../../helpers/mongodb";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const email = req.body.email
        if (!email || !email.includes('@')) {
            res.status(422).json({ message: 'Invalid email adress' })
            return;
        }
        try {
            const { db } = await connectToDatabase()
            await db.collection('email').insertOne({ email })
          
            
            res.status(201).json({ message: 'Signed up!' })
            return 
        } catch (error) {
            res.status(500).json({ message: 'Insert fail' })
            return
        }

    }
}