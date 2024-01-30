import { pool } from "../db/pool.js";
import { validationResult, check } from 'express-validator';

const postUserValidationRules = [
    check('fName').isString(),
    check('lName').isString(),
    check('age').isNumeric(),
    check('active').isBoolean(),
];

const modifyUserValidationRules = [
    check('age').isNumeric(),
];



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
        await Promise.all(postUserValidationRules.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

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
        await Promise.all(modifyUserValidationRules.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
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

export const getOrdersByUserId = async (req, res) => {
    const { id } = req.params;

    try {
        // Fetch orders for the specified user ID
        const { rows } = await pool.query('SELECT * FROM orders WHERE user_id=$1;', [id]);
        console.log(rows);
        res.json(rows);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};