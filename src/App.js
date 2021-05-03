import React from "react";
import "./App.css";

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

function TodoForm({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
      <form onSubmit={handleSubmit}>
        <input
            type="text"
            className="input"
            value={value}
            placeholder="zadanie do zrobienia"
            onChange={(e) => setValue(e.target.value)}
        />
      </form>
  );
}

function App() {
  const [todos, setTodos] = React.useState([]);

  const addTodo = (text) => {
    const newTodos = [...todos, { text, isFinish: false }];
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
            <TodoForm addTodo={addTodo} />
          </div>
        </div>
      </div>
  );
}

export default App;
