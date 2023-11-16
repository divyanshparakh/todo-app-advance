import React, { useState, useEffect } from 'react';
import './ViewTodos.scss';
import api from '../index';
import jwtDecode from "jwt-decode";



function ViewTodos({decodedToken, logoutButton}) {
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [openAddDialog, handleAddTodoDialogOpen] = useState(false);
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
            if(response.status === 200)
                setTodos(response.data);
            setIsLoading(false);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Handle 401 Unauthorized error, e.g., redirect to login page
                localStorage.removeItem('token');
            } else {
                console.error("Error fetching todos:", error);
                setIsLoading(true);
            }
        }
    };

    const handleCreateTodo = async () => {
        setEditingTodo(null);
        try {
            const response = await api.post("/todos", {
                ...newTodo,
            });
            setNewTodo({
                id: "0",
                title: "",
                progress: 0,
            });
            handleAddTodoDialogOpen(false);
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
            setEditingTodo(null);
            await api.delete(`/todos/${todoId}`)
            .then(
                getTodos()
            )
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    const handleNewTodoDialogClose = () => {
        handleAddTodoDialogOpen(false);
    };

    const handleEditTodoDialogOpen = (todoId) => {
        handleNewTodoDialogClose();
        const editingTodo = todos.find((todo) => todo.id === todoId);
        setEditingTodo(editingTodo);
    };

    const calculateBackground = (progress) => {
        return `linear-gradient(to right, #e3507d ${progress}%, #d3d3d3 ${progress}%)`;
    };

    useEffect(() => {
        getTodos();
        // console.log(decodedToken);
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
            // Close the add todo dialog
                handleNewTodoDialogClose();
                setEditingTodo(null);
            // Close the edit todo dialog                
            }
        };
        // Attach the event listener
        window.addEventListener('keydown', handleKeyDown);
        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
	}, []);

    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }
    
    return (
        <div className="scaffold">
            <h1>TODOs</h1>
            <section>
                <button onClick={() => handleAddTodoDialogOpen(true)}>Add</button>
                { logoutButton }
            </section>
            {
                openAddDialog && (
                    <form className="dialog create-todo" onSubmit={handleNewTodoDialogClose}  style={{ background: calculateBackground(newTodo.progress) }}>
                        <input
                            type="text"
                            value={newTodo.title}
                            className='title'
                            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                            autoFocus
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
                        <button type='submit'>Cancel</button>
                    </form>
                )
            }
            <ul className="todo-list">
                {todos.length > 0 && todos.map((todo, index) => (
                    <li key={todo.id} className="todo-item-card" style={{ background: calculateBackground(editingTodo?.progress || todo.progress) }}>
                        {editingTodo && editingTodo.id === todo.id ? (
                            <form onSubmit={(e) => handleEditTodo(e, todo.id)} className="edit-todo-form">
                                <input
                                    type="text"
                                    value={editingTodo.title}
                                    className='title'
                                    onChange={(e) => setEditingTodo({ ...editingTodo, title: e.target.value })}
                                    autoFocus
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
                                {(editingTodo.title !== todo.title || editingTodo.progress !== todo.progress) && <button type='submit'>Save</button>}
                                <button type='button' onClick={() => { setEditingTodo(null) }}>Cancel</button>
                            </form>
                        ) : (
                            <div className="todo-card-header" onClick={() => handleEditTodoDialogOpen(todo.id)}>
                                {todo.title}
                            </div>
                        )}
                        <br />
                        <br />
                        <br />
                        <div className="todo-card-options">
                            {/* <button onClick={() => handleEditTodoDialogOpen(todo.id)}>Edit</button> */}
                            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ViewTodos;
