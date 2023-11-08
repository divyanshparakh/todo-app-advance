const {v4:uuidv4} = require("uuid");
var { todos_pool } = require("../database");
const jwt = require('jsonwebtoken');

exports.getTodos = function (req, res, next) {
    const email = req.email;
    // console.log(req.email);
    todos_pool.query("SELECT * FROM Todos WHERE email=$1",
        [email],
        (err, results) => {
            if (err) {
                console.error(err.stack);
            }
            if (results.rowCount > 0)
                res.status(200).send(results.rows);
            else
                res.status(200).send(); // No Data Found
        }
    );
};


exports.addTodos = function(req, res, next) {
    // console.log(req.email);
    // console.log(req.body);
    const { title, progress } = req.body;
    const email = req.email; // Added to req after verifying the jwt in the server itself
    const id = uuidv4();
    console.log(id);
    try {
        todos_pool.query("INSERT INTO todos (id, email, title, progress) VALUES ($1, $2, $3, $4)",
            [
                id,
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
    // console.log(req.body);
    const {id} = req.params;
    const email = req.email; // Added to req after verifying the jwt in the server itself
    const { title, progress } = req.body;
    
    try {
        todos_pool.query("UPDATE todos SET title=$2, progress=$3 WHERE id=$4 AND email=$1",
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
                // console.log(results);
                res.status(201).send({ message: "Edited TODOs" });
            }
        })
    } catch (error) {
        console.log(error);
    }
}

exports.deleteTodos = function(req, res, next) {
    console.log(req.params);
    const id = req.params.id;
    
    try {
        todos_pool.query("DELETE FROM todos WHERE id=$1", [id], (err, results) => {
            if (err) {
                if (JSON.stringify(err.detail).search("already exists") === -1) {
                    res.status(400).json({ message: "Something Unexpected Happened" });
                } else {
                    res.status(400).json({ message: "Duplicate TODO" });
                }
            } else {
                res.status(200).json({ message: "Deleted TODO" });
            }
        });
    } catch (error) {
        console.error(error);
    }
    
}