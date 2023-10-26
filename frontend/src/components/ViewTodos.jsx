import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewTodos.scss"; // Import your SCSS file

function ViewTodos() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const apiUrl = "http://localhost:3000/todos";
    
        axios
        .get(apiUrl, {
            headers: {
                'Access-Control-Allow-Origin': '*',
              // Add any other necessary headers here
            },
        })
        .then((response) => {
            setTodos(response.data);
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching todos:", error);
            setLoading(true);
        });
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="todo-list">
            <h1>Todo List</h1>
            <ul>
                {todos.map((todo) => (
                <li key={todo.id} className="todo-item">
                    <strong>ID:</strong> {todo.id}<br />
                    <strong>Title:</strong> {todo.title}<br />
                    <strong>Progress:</strong> {todo.progress}<br />
                </li>
                ))}
            </ul>
        </div>
    );
}

export default ViewTodos;
