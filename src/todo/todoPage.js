import TodoForm from "../todoForm/todoForm";
import Todo from "./todo";
import {TODO_LIST_KEY, URL} from "./../const";
import React, {useEffect, useReducer} from "react";
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

function reducer(state, action) {
    switch (action.type) {
        case 'done':
            return true;
        case 'notdone':
            return false;
        case 'all':
            return null;
        default:
            throw new Error();
    }
}

const TodoPage = ({props}) => {
    const [todos, setTodos] = useLocalStorageState(TODO_LIST_KEY);
    const [doneFilter, dispatch] = useReducer(reducer, null);

    useEffect(() => {
        if (todos !== undefined && todos.length === 0) {
            fetchExternalTodoList().then(data => {
                if (data) {
                    setTodos([...todos, ...data]);
                }
            });
        }
    }, [])

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

    const handleLogout = () => {
        props.history.push('/')
    }

    async function fetchExternalTodoList() {
        try {
            let axiosResponse = await axios.get(URL);
            if (axiosResponse.status === 200) {
                return axiosResponse.data.map(todo => {
                    return {text: todo.title, isFinish: todo.completed}
                });
            }
        } catch (e) {
            console.log("fetchExternalTodoList error: ", e);
        }

    }

    return (
        <div className="backgroundApp">
            <button onClick={handleLogout}>Wyloguj</button>
            <p className="textTodo">Aplikacja Todo</p>
            <button onClick={() => dispatch({type: 'done'})}>Zrobione</button>
            <button onClick={() => dispatch({type: 'notdone'})}>Do zrobienia</button>
            <button onClick={() => dispatch({type: 'all'})}>Wszystko</button>

            <div className="todo-list">
                {todos.map((todo, index) => (
                    <Todo
                        key={index}
                        index={index}
                        todo={todo}
                        finishTodo={finishTodo}
                        removeTodo={removeTodo}
                        visible={doneFilter}
                    />
                ))}
                <TodoForm addTodo={addTodo}/>
            </div>
        </div>
    );
}

export default TodoPage;
