import { pool } from '../config/db';

export async function createUser(userData) {
    const { name, email, password, verify, admin } = userData;
    const [result] = await pool.query(
        `INSERT INTO Users (name, email, password, verify, admin)
         VALUES (?, ?, ?, ?, ?)`,
        [name, email, password, verify, admin]
    );
    return result;
}

export async function getUserByEmail(email) {
    const [rows] = await pool.query(
        `SELECT * FROM Users WHERE email = ?`,
        [email]
    );
    return rows[0];
}