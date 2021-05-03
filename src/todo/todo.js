import React from "react";

function Todo({ todo, index, finishTodo, removeTodo }) {
    return (
        <div
            className="todo"
            style={{ textDecoration: todo.isFinish ? "line-through" : "" }}
        >
            {todo.text}
            <div>
                <button onClick={() => finishTodo(index)}>Complete</button>
                <button onClick={() => removeTodo(index)}>x</button>
            </div>
        </div>
    );
}

export default Todo;
