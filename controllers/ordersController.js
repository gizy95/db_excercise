import { pool } from "../db/pool.js";
import { validationResult, check } from 'express-validator';

const postOrderValidationRules = [
    check('price').isNumeric(),
    check('date').isISO8601().toDate(),
    check('user_id').isNumeric(),
];

const modifyOrderValidationRules = [
    check('price').isNumeric(),
];


export const getOrders = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM orders;');
        console.log(rows)
        res.json(rows)
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

export const getOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query('SELECT * FROM orders WHERE id=$1;', [id]);
        console.log(rows)
        res.json(rows[0])
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

export const postOrder = async (req, res) => {
    try {

        await Promise.all(postOrderValidationRules.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { price, date, user_id } = req.body;
        const { rows } = await pool.query('INSERT INTO orders (price, date, user_id) VALUES ($1, $2, $3) RETURNING *', [price, date, user_id]);
        res.status(201).json(rows[0])
    } catch (err) {
        res.sendStatus(500)
    }
}

export const modifyOrder = async (req, res) => {
    const { id } = req.params;

    try {
        await Promise.all(modifyOrderValidationRules.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { price } = req.body;
        const { rows } = await pool.query('UPDATE orders SET price=$1 WHERE id=$2 RETURNING *', [price, id]);
        res.status(200).json(rows[0])
    } catch (err) {
        res.sendStatus(500)
    }
}

export const deleteOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const { rows } = await pool.query('DELETE FROM orders WHERE id=$1 RETURNING *', [id]);
        res.status(200).json(rows[0])
    } catch (err) {
        res.sendStatus(500)
    }
}