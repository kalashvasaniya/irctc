import { pool } from '../../../config/db';
import sendEmail from '@/utils/sendEmail';

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

            try {
                console.log("hello");
                console.log(result.insertId);
                console.log(password + email);

                const [tokenResult] = await pool.query(
                    'INSERT INTO tokens (id, token2) VALUES (?, ?)',
                    [result.insertId, password + email]
                );

                console.log("Token inserted with ID:", tokenResult.insertId);
                console.log("hellow");


                const verifyUrl = `http://localhost:3000/api/verify?id=${result.insertId}&token=${password + email}`;
                const message = `Hello, ${name}
        
Thank you for signing up with IRCTC! Please click on the link below to verify your email:
        
${verifyUrl}
        
If you did not sign up for IRCTC, please ignore this email.
        
Best regards
IRCTC Team`;

                await sendEmail({
                    email: email,
                    subject: 'Verify your email address',
                    text: message
                });

                console.log(verifyUrl)
                console.log(message)

                res.status(200).json({ success: true, data: result });
            } catch (err) {
                res.status(500).json({ success: false, error: err.message });
            }

        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}