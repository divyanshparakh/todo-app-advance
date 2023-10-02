const {v4:uuidv4} = require("uuid");
var { todos_pool } = require("../database");

exports.getTodos = function (req, res, next) {
    const email = req.params.email;
    todos_pool.query("SELECT * FROM Todos", (err, results) => {
        if (err) {
            console.error(err.stack);
        }
        res.status(200).send(results.rows);
    });
};


exports.addTodos = function(req, res, next) {
    const { email, title, progress, date } = req.body;
    const id = uuidv4();
    // console.log(user_email,title);
    try {
        todos_pool.query("INSERT INTO todos( id, email, title, progress, date) VALUES ($1, $2, $3, $4, $5)",
            [
                id,
                email,
                title,
                progress,
                date
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
                    res.status(201).send({ message: "Created TODO" });
                }
            }
        )
        res.json(newtodo.rows);
    } catch (error) {
        console.log(error);
    }
}

exports.editTodos = function(req, res, next) {
    const {id} = req.params;
    const { email, title, progress, date} = req.body;
    
    try {
        todos_pool.query("UPDATE todos SET email=$1, title=$2, progress=$3, date=$4 WHERE id=$5",
        [
            email,
            title,
            progress,
            date,
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