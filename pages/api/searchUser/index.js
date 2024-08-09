import { pool } from '../../../config/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ success: false, error: 'Email is required' });
        }

        try {
            const [user] = await pool.query(
                `SELECT * FROM Users WHERE email = ?`,
                [email]
            );

            if (user.length === 0) {
                return res.status(401).json({ success: false, error: 'No user found with that email' });
            }

            res.status(200).json({
                success: true,
                name: user[0].name,
                message: 'User found',
                user: user[0],
            });
        } catch (error) {
            console.error('Error searching user:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
