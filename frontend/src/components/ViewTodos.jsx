import React, { useState, useEffect } from 'react';
import './ViewTodos.scss';
import api from '../index';
import jwtDecode from "jwt-decode";



function ViewTodos(decodedToken) {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, handleNewTodoDialogOpen] = useState(false);
    const [editingTodo, setEditingTodo] = useState({
        id: '0',
        title: '',
        progress: 0, // Assuming progress is a number, change it according to your requirements
    });

    const [newTodo, setNewTodo] = useState({
        id: '0',
        title: '',
        progress: 0, // Assuming progress is a number, change it according to your requirements
    });

    const getTodos = async () => {
        try {
            const response = await api.get("/todos", {
                decodedToken,
            });
            setTodos(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching todos:", error);
            setLoading(true);
        }
    };

    const handleCreateTodo = async () => {
        try {
            const response = await api.post("/todos", {
                ...newTodo,
            });
            setNewTodo({
                id: "0",
                title: "",
                progress: 0,
            });
            handleNewTodoDialogOpen(false);
            getTodos();
        } catch (error) {
            console.log(error.response.data.message.replace(/"/g, ""));
        }
    };

    const handleEditTodo = async () => {
        try {
            await api.put(`/todos/${editingTodo.id}`, {
                title: editingTodo.title,
                progress: editingTodo.progress
            })
            .then(
                setEditingTodo(null)
            )
            .then(
                getTodos()
            )
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };
    
    const handleDeleteTodo = async (todoId) => {
        try {
            await api.delete(`/todos/${todoId}`).then(
                getTodos()
            )
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    const handleNewTodoDialogClose = () => {
        handleNewTodoDialogOpen(false);
    };

    const handleEditTodoDialogOpen = (todoId) => {
        const editingTodo = todos.find((todo) => todo.id === todoId);
        setEditingTodo(editingTodo);
        getTodos();
    };

    const calculateBackground = (progress) => {
        return `linear-gradient(to right, #e3507d ${progress}%, #d3d3d3 ${progress}%)`;
    };

    useEffect(() => {
        // console.log(decodedToken);
        getTodos()
	}, []);

    return (
        <div className="todo-list">
            <h1>TODOs</h1>
            <button onClick={() => handleNewTodoDialogOpen(true)}>Add</button>
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
                        <button onClick={handleNewTodoDialogClose}>Cancel</button>
                    </div>
                )
            } 
            <ul>
                {
                    todos.map((todo, index) => (
                        <li key={todo.id} className="todo-item-card" style={{ background: calculateBackground(todo.progress) }}>
                            {/* {index + 1} */}
                            <div className="todo-card-header">
                                {todo.title}
                            </div>
                            <br />
                            <br />
                            <br />
                            <div className="todo-card-options">
                                <button onClick={() => handleEditTodoDialogOpen(todo.id)}>Edit</button>
                                <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                                {editingTodo && editingTodo.id === todo.id && (
                                    <div className="dialog edit-todo">
                                        <input
                                            type="text"
                                            value={editingTodo.title}
                                            className='title'
                                            onChange={(e) => setEditingTodo({ ...editingTodo, title: e.target.value })}
                                        />
                                        <div className="range-slider-container">
                                            <input
                                                type="range"
                                                min={0}
                                                max={100}
                                                value={editingTodo.progress}
                                                className='slider'
                                                onChange={(e) => setEditingTodo({ ...editingTodo, progress: parseInt(e.target.value, 10) })}
                                            />
                                            <span className="slider-value">{editingTodo.progress}</span>
                                        </div>
                                        {(editingTodo.title !== todo.title || editingTodo.progress !== todo.progress) && <button onClick={handleEditTodo}>Save</button>}
                                        <button onClick={() => { setEditingTodo(null) }}>Cancel</button>
                                    </div>
                                )}
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default ViewTodos;
