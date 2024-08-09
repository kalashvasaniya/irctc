import { pool } from '../../../config/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const [rows] = await pool.query('SELECT * FROM train');
            res.status(200).json(rows);
        } catch (err) {
            console.error('Error fetching trains:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else if (req.method === 'POST') {
        const { source, destination, num_of_trains, num_of_seats, departure_time, arrival_time, train_number, train_type, status } = req.body;
        try {
            const [result] = await pool.query(
                'INSERT INTO train (source, destination, num_of_trains, num_of_seats, departure_time, arrival_time, train_number, train_type, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [source, destination, num_of_trains, num_of_seats, departure_time, arrival_time, train_number, train_type, status]
            );
            res.status(201).json({ id: result.insertId });
        } catch (err) {
            console.error('Error creating train:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
}
