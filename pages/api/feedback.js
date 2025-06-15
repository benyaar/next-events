export default function handler(req, res) {
    if(req.method === 'POST'){
        const email = req.body.email
        const feedbackText = req.body.text
        const newFeedback =  {
            id: new Date().toISOString(),
            email,
            text: feedbackText
        }
    }
    res.status(200).send('ee')
}