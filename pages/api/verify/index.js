import { pool } from '../../../config/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const [userRows] = await pool.query('SELECT * FROM users WHERE id = ?', [req.query.id]);

            if (userRows.length === 0) {
                return res.status(400).json({ error: 'Invalid Link' });
            }

            const user = userRows[0];

            const [tokenRows] = await pool.query(
                'SELECT * FROM tokens WHERE id = ? AND token2 = ?',
                [user.id, req.query.token]
            );

            if (tokenRows.length === 0) {
                return res.status(400).json({ error: 'Invalid Link or Expired' });
            }

            await pool.query('UPDATE users SET verify = 1 WHERE id = ?', [user.id]);

            res.setHeader('Location', '/VerifyDone');
            return res.status(302).end();
        } catch (err) {
            console.error('Error verifying email:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
}
