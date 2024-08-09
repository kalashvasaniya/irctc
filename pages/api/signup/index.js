import { pool } from '../../../config/db';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }

        try {
            const verifyStatus = email === 'kalashvasaniya@gmail.com' ? true : false;

            const [result] = await pool.query(
                `INSERT INTO Users (name, email, password, admin)
                 VALUES (?, ?, ?, ?)`,
                [name, email, password, verifyStatus]
            );

            res.status(201).json({
                message: 'User created successfully',
                userId: result.insertId
            });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}