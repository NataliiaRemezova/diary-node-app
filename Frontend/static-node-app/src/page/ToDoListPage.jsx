import React, { useState, useEffect } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react'; // Importing popover components from Next UI
import '../styles/ToDoListPage.css';

const ToDoListPage = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [editingTodoId, setEditingTodoId] = useState(null);
    const [editingTodoText, setEditingTodoText] = useState('');

    // Fetch all todos from the backend
    useEffect(() => {
        fetchHabits();
    }, []);

    const fetchHabits = () => {
        fetch('http://localhost:5000/api/todolist/get-all-todos', {
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setTodos(data);
                } else {
                    setTodos([]);
                }
            })
            .catch(err => console.error('Error fetching todos:', err));
    };

    // Handle adding a new todo
    const handleAddTodo = () => {
        if (newTodo.trim() !== '') {
            fetch('http://localhost:5000/api/todolist/create-todo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ text: newTodo.trim() }),
            })
            .then(response => response.json())
            .then(data => {
                setTodos([...todos, data]);
                setNewTodo('');
            })
            .catch(error => {
                console.error("There was an error creating the todo!", error);
            });
        }
    };

    // Handle removing a todo
    const handleRemoveTodo = (id) => {
        // Implementing popover confirmation
        return (
            <Popover placement="top">
                <PopoverTrigger>
                    <button className="remove">Delete</button>
                </PopoverTrigger>
                <PopoverContent>
                    <div className="p-2">
                        <p>Are you sure you want to delete this todo?</p>
                        <div className="center">
                            <button
                                style={{ backgroundColor: '#d9534f', color: '#fff' }}
                                onClick={() => confirmDelete(id)}
                                className="remove">
                                Confirm
                            </button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        );
    };

    // Confirm delete function
    const confirmDelete = (id) => {
        fetch(`http://localhost:5000/api/todolist/delete-todo/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        })
        .then(() => {
            setTodos(todos.filter(todo => todo._id !== id));
        })
        .catch(error => {
            console.error("There was an error deleting the todo!", error);
        });
    };

    // Handle updating a todo's completion status
    const handleToggleCompletion = (id, completion) => {
        fetch(`http://localhost:5000/api/todolist/update-todo/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ completion: !completion }),
        })
        .then(response => response.json())
        .then(data => {
            setTodos(todos.map(todo => todo._id === id ? data : todo));
        })
        .catch(error => {
            console.error("There was an error updating the todo!", error);
        });
    };

    // Handle entering edit mode for a todo
    const handleEditTodo = (id, text) => {
        setEditingTodoId(id);
        setEditingTodoText(text);
    };

    // Handle saving the edited todo text
    const handleSaveTodo = (id) => {
        fetch(`http://localhost:5000/api/todolist/update-todo/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ text: editingTodoText }),
        })
        .then(response => response.json())
        .then(data => {
            setTodos(todos.map(todo => todo._id === id ? { ...todo, text: editingTodoText } : todo));
            setEditingTodoId(null);
            setEditingTodoText('');
        })
        .catch(error => {
            console.error("There was an error updating the todo!", error);
        });
    };

    const handleInputChange = (e) => {
        setNewTodo(e.target.value);
    };

    const handleEditInputChange = (e) => {
        setEditingTodoText(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddTodo();
        }
    };

    return (
        <div className="container">
            <h1 className="todolistHeader">To-Do List</h1>
            <div className="input-container">
                <input
                    type="text"
                    value={newTodo}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Add a new todo"
                />
                <button onClick={handleAddTodo}>Add</button>
            </div>
            <ul>
                {todos.map(todo => (
                    <li className="todo-item" key={todo._id}>
                        <input
                            type="checkbox"
                            checked={todo.completion}
                            onChange={() => handleToggleCompletion(todo._id, todo.completion)}
                        />
                        {editingTodoId === todo._id ? (
                            <input
                                type="text"
                                value={editingTodoText}
                                onChange={handleEditInputChange}
                                onBlur={() => handleSaveTodo(todo._id)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSaveTodo(todo._id);
                                    }
                                }}
                            />
                        ) : (
                            <span className={`todo-text ${todo.completion ? 'completed' : ''}`}>
                                {todo.text}
                            </span>
                        )}
                        {editingTodoId === todo._id && (
                            <button className="edit" onClick={() => handleSaveTodo(todo._id)}>Done</button>
                        )}
                        {editingTodoId !== todo._id && (
                            <button className="edit" onClick={() => handleEditTodo(todo._id, todo.text)}>Edit</button>
                        )}
                        {handleRemoveTodo(todo._id)} {/* Render the popover for delete confirmation */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ToDoListPage;
