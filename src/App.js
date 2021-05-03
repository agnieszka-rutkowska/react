import React, {useEffect, useState} from "react";
import "./App.css";
import TodoForm from "./todoForm/todoForm";
import Todo from "./todo/todo";
import {TODO_LIST_KEY, URL} from "./const";
import axios from "axios";

function useLocalStorageState(key) {
    const [value, setValue] = React.useState(
        () => {
            let todoList = JSON.parse(localStorage.getItem(key));
            if (todoList == null) {
                return [];
            } else {
                return todoList;
            }
        }
    );
    const setCustomValue = (input) => {
        setValue(input);
        localStorage.setItem(key, JSON.stringify(input));
    };
    return [value, setCustomValue];
}

function App() {
    const [todos, setTodos] = useLocalStorageState(TODO_LIST_KEY);

    useEffect(() => {
        fetchExternalTodoList().then(data => {
            setTodos([...todos, ...data]);
        });
    },[])

    const addTodo = (text) => {
        const newTodos = [...todos, {text, isFinish: false}];
        setTodos(newTodos);
    };

    const finishTodo = (index) => {
        const newTodos = [...todos];
        newTodos[index].isFinish = true;
        setTodos(newTodos);
    };

    const removeTodo = (index) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    async function fetchExternalTodoList() {
        let axiosResponse = await axios.get(URL);
        if (axiosResponse.status === 200) {
            return axiosResponse.data.map(todo => {
                return {text: todo.title, isFinish: todo.completed}
            });
        }
    }

    return (
        <div className="app">
            <div className="backgroundApp">
                <p className="textTodo">Aplikacja Todo</p>
                <div className="todo-list">
                    {todos.map((todo, index) => (
                        <Todo
                            key={index}
                            index={index}
                            todo={todo}
                            finishTodo={finishTodo}
                            removeTodo={removeTodo}
                        />
                    ))}
                    <TodoForm addTodo={addTodo}/>
                </div>
            </div>
        </div>
    );
}

export default App;

//https://jsonplaceholder.typicode.com/users/1/todos
