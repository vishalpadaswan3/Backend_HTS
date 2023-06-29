
const express = require('express');
const app = express();
const cors = require('cors');
const { userRouter } = require('./Routes/user.Routes');
const { connection } = require('./Config/db');
require('dotenv').config();

const port = process.env.PORT

app.use(cors());
app.use(express.json());
app.use(userRouter);


app.get('/', (req, res) => {
    try {
        res.status(200).send("Deployed Backend for UI App");
    } catch (error) {
        res.status(500).send(error.message);
    }
})


app.listen(port, async () => {
    try {
        await connection;
        console.log("Connected to Database");
    } catch (error) {
        console.log(error.message);
    }
    console.log(`Server is running on port ${port}`);
})