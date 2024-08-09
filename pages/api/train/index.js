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
    } else if (req.method === 'PUT') {
        const { id, num_of_seats } = req.body;
        console.log("Hello", id, num_of_seats)
        try {
            // Fetch the current number of seats to decrement
            const [currentSeats] = await pool.query('SELECT num_of_seats FROM train WHERE id = ?', [id]);

            if (currentSeats.length === 0) {
                return res.status(404).json({ error: 'Train not found' });
            }

            const updatedSeats = currentSeats[0].num_of_seats - num_of_seats;

            if (updatedSeats < 0) {
                return res.status(400).json({ error: 'Not enough seats available' });
            }

            const [result] = await pool.query(
                'UPDATE train SET num_of_seats = ? WHERE id = ?',
                [updatedSeats, id]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Train not found' });
            }

            res.status(200).json({ success: true, id });
        } catch (err) {
            console.error('Error updating train:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
}
