import { pool } from "../db/pool.js";



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

        const { price, date, user_id } = req.body;
        const { rows } = await pool.query('INSERT INTO orders (price, date, user_id) VALUES ($1, $2, $3) RETURNING *', [price, date, user_id]);
        console.log(rows)
        res.status(201).json(rows[0])
    } catch (err) {
        res.sendStatus(500)
    }
}

export const modifyOrder = async (req, res) => {
    const { id } = req.params;

    try {
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