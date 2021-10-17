const express = require('express');
const todoRouter = express.Router();
const pool = require('../modules/pool.js');
// DB CONNECTION

// GET
todoRouter.get('/', (req, res) => {
    let queryText = `
    SELECT * FROM "items"
    ORDER BY completion_status;
    `;
    pool.query(queryText)

        .then((result) => {
            res.send(result.rows)
        })
        .catch((error) => {
            console.log(error)
            res.sendStatus(500)
        })
    })



module.exports = todoRouter; 