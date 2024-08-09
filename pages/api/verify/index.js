import { pool } from '../../../config/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Query the user
            console.log("verify" + req.query.id)
            const [userRows] = await pool.query('SELECT * FROM users WHERE id = ?', [req.query.id]);

            if (userRows.length === 0) {
                return res.status(400).json({ error: 'Invalid Link' });
            }

            console.log("verify" + userRows.length)

            const user = userRows[0];

            // Query the token
            const [tokenRows] = await pool.query(
                'SELECT * FROM tokens WHERE id = ? AND token2 = ?',
                [user.id, req.query.token]
            );

            if (tokenRows.length === 0) {
                return res.status(400).json({ error: 'Invalid Link or Expired' });
            }

            // Update user verification status
            await pool.query('UPDATE users SET verify = 1 WHERE id = ?', [user.id]);

            // Optionally delete the token (uncomment if needed)
            // await pool.query('DELETE FROM tokens WHERE id = ?', [tokenRows[0].id]);

            // Redirect and respond
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
