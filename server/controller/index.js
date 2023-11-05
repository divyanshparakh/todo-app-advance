const {v4:uuidv4} = require("uuid");
var { todos_pool } = require("../database");
const jwt = require('jsonwebtoken');

exports.getTodos = function (req, res, next) {
    // console.log(req.body);
    const email = req.body.email;
    todos_pool.query("SELECT * FROM Todos",
        [],
        (err, results) => {
            if (err) {
                console.error(err.stack);
            }
            if (results.rowCount > 0)
                res.status(200).send(results.rows);
            res.status(200).send(); // No Data Found
        }
    );
};


exports.addTodos = function(req, res, next) {
    const { title, progress } = req.body;
    const email = req.email; // Added to req after verifying the jwt in the server itself
    // console.log(req.body);
    const id = uuidv4();
    try {
        todos_pool.query("INSERT INTO todos (email, title, progress) VALUES ($1, $2, $3)",
            [
                email,
                title,
                progress
            ],
            (err, results) => {
                if (err) {
                    // console.log(JSON.stringify(err));
                    JSON.stringify(err["detail"]).search("already exists") == -1
                        ? res.status(400).json({
                            message: "Something Unexpected Happened",
                        })
                        : res.status(400).json({
                            message: "Duplicate TODO",
                        });
                } else if (results) {
                    // console.log(results);
                    res.status(201).send({ message: "Created TODO" });
                }
            }
        )
    } catch (error) {
        console.log(error);
    }
}

exports.editTodos = function(req, res, next) {
    const {id} = req.params;
    const email = req.email; // Added to req after verifying the jwt in the server itself
    const { title, progress } = req.body;
    
    try {
        todos_pool.query("UPDATE todos SET email=$1, title=$2, progress=$3 WHERE id=$4",
        [
            email,
            title,
            progress,
            id
        ],
        (err, results) => {
            if (err) {
                JSON.stringify(err["detail"]).search("already exists") == -1
                    ? res.status(400).json({
                        message: "Something Unexpected Happened",
                    })
                    : res.status(400).json({
                        message: "Duplicate TODO",
                    });
            } else if (results) {
                console.log(results);
                res.status(201).send({ message: "Edited TODO" });
            }
        })
        res.json(newtodo.rows);
    } catch (error) {
        console.log(error);
    }
}

exports.deleteTodos = function(req, res, next) {
    const id = uuidv4();
    
    try {
        todos_pool.query("DELETE FROM todos WHERE id=$1",
            [id],
            (err, results) => {
                if (err) {
                    JSON.stringify(err["detail"]).search("already exists") == -1
                        ? res.status(400).json({
                            message: "Something Unexpected Happened",
                        })
                        : res.status(400).json({
                            message: "Duplicate TODO",
                        });
                } else if (results) {
                    console.log(results);
                    res.status(201).send({ message: "Deleted TODO" });
                }
            }
        )
        res.json(newtodo.rows);
    } catch (error) {
        console.log(error);
    }
}