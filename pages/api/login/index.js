import { pool } from '../../../config/db';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, error: 'Email and password are required' });
        }

        try {
            const [user] = await pool.query(
                `SELECT * FROM Users WHERE email = ? AND password = ?`,
                [email, password]
            );

            if (user.length === 0) {
                return res.status(401).json({ success: false, error: 'Invalid email or password' });
            }

            res.status(200).json({
                success: true,
                message: 'Login successful',
                user: user[0],
                token: email
            });
        } catch (error) {
            console.error('Error logging in:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
