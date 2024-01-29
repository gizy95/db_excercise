import { pool } from "../db/pool.js";



export const getUsers = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM users;');
        console.log(rows)
        res.json(rows)
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

export const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query('SELECT * FROM users WHERE id=$1;', [id]);
        console.log(rows)
        res.json(rows[0])
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

export const postUser = async (req, res) => {
    try {

        const { fName, lName, age, active } = req.body;
        const { rows } = await pool.query('INSERT INTO users (first_name, last_name, age,active) VALUES ($1, $2, $3,$4) RETURNING *', [fName, lName, age, active]);
        console.log(rows)
        res.status(201).json(rows[0])
    } catch (err) {
        res.sendStatus(500)
    }
}

export const modifyUser = async (req, res) => {
    const { id } = req.params;

    try {
        const { age } = req.body;
        const { rows } = await pool.query('UPDATE users SET age=$1 WHERE id=$2 RETURNING *', [age, id]);
        res.status(200).json(rows[0])
    } catch (err) {
        res.sendStatus(500)
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const { rows } = await pool.query('DELETE FROM users WHERE id=$1 RETURNING *', [id]);
        res.status(200).json(rows[0])
    } catch (err) {
        res.sendStatus(500)
    }
}