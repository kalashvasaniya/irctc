// test api
export default async function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json({ message: 'Hello from the test API' });
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
