import React, { useState, useEffect } from 'react';
import './ViewTodos.scss';
import api from '../index';
import jwtDecode from "jwt-decode";

function ViewTodos(decodedToken) {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);

    const [newTodo, setNewTodo] = useState({
        title: '',
        progress: 0, // Assuming progress is a number, change it according to your requirements
    });

    const getTodos = async () => await api.get('/todos', {
        decodedToken
    },
    {
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Accept": "application/vnd.api+json",
            "Authorization": localStorage["token"],
        },
    })
    .then((response) => {
        if (response.data != null) {
            setTodos(response.data);
            setLoading(false);
        }
    })
    .catch((error) => {
        console.error('Error fetching todos:', error);
        setLoading(true);
    });

    const handleCreateTodo = async () => {
        try {
			const response = await api.post('/todos', {
                ...newTodo
			},
			{
				headers: {
					"Content-Type": "application/json;charset=UTF-8",
					"Accept": "application/vnd.api+json",
                    "Authorization": localStorage["token"],
				},
			});
			// Perform actions upon successful Register
		} catch (error) {
            console.log(error.response.data.message.replace(/"/g, ""));
			// Handle error, show a message, etc.
		}
        setOpenDialog(false);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    useEffect(() => {
        console.log(decodedToken);
        getTodos()
	}, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="todo-list">
        <h1>TODOs</h1>
        <button onClick={() => setOpenDialog(true)}>Add</button>

        {
            openDialog && (
                <div className="dialog create-todo">
                    <input
                        type="text"
                        value={newTodo.title}
                        className='title'
                        onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                    />
                    <div className="range-slider-container">
                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={newTodo.progress}
                            className='slider'
                            onChange={(e) => setNewTodo({ ...newTodo, progress: parseInt(e.target.value, 10) })}
                        />
                        <span className="slider-value">{newTodo.progress}</span>
                    </div>
                    {newTodo.title && <button onClick={handleCreateTodo}>Add</button>}
                    <button onClick={handleDialogClose}>Cancel</button>
                </div>
            )
        }
        
        <ul>
            {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
                <strong>ID:</strong> {todo.id}
                <br />
                <strong>Title:</strong> {todo.title}
                <br />
                <strong>Progress:</strong> {todo.progress}
                <br />
            </li>
            ))}
        </ul>


        </div>
    );
}

export default ViewTodos;
