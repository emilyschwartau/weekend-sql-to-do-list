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

// POST
todoRouter.post('/', (req, res) => {
    console.log(req.body)

    let queryText = `
        INSERT INTO items ("task", "completion_status")
        VALUES ($1, $2);
`
    let values = [req.body.task, req.body.completion_status];
    pool.query(queryText, values).then(result => {

        console.log('added values', result.rows);
    }).then((response) => {
        res.sendStatus(201);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    })
});

// PUT
todoRouter.put('/:id', (req, res) => {
    let id = req.params.id;
    console.log(id);

    let queryText = `
    UPDATE "items"
    SET "completion_status" = true
    WHERE "id" = $1
    `
    let values = [id];

    pool.query(queryText, values).then(result => {
        res.sendStatus(200);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })

});

//DELETE
todoRouter.delete('/:id', (req, res) => {
    let id = req.params.id
    console.log(id);

    //pool.query...
    let queryText = `
      DELETE FROM "items"
      WHERE "id" = $1;
    `
    let values = [id];

    pool.query(queryText, values).then(result => {
        res.sendStatus(204);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })

});

module.exports = todoRouter;