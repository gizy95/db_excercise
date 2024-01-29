import 'dotenv/config'
import express from 'express';
import usersRouter from './routes/users.js';

const app = express();
const port = 8000;

app.use('/users', usersRouter)


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})