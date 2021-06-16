import React from "react";

function Todo({ todo, index, finishTodo, removeTodo, visible = null }) {
    if(visible == null || visible === todo.isFinish){
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
    } else {
        return (<div></div>);
    }

}

export default Todo;
