import React, { useState } from "react";
import type { TodoTypes } from "../todo";
import TodoService from "../TodoService";
import TodoForm from "./TodoForm";
import "../CSS/TodoList.css";

const TodoList = () => {
  const [todos, setTodos] = useState<TodoTypes[]>(TodoService.getTodo());
  const [editingTodoId, setEditedTodoId] = useState<number | null>(null);
  const [editedTodoText, setEditedTodoText] = useState<string>("");

  //function to handle edit actions

  const handleEditStart = (id: number, text: string) => {
    setEditedTodoId(id);
    setEditedTodoText(text);
  };

  const handleEditCancel = () => {
    setEditedTodoId(null);
    setEditedTodoText("");
  };

  const handleEditSave = (id: number) => {
    if (editedTodoText.trim() !== "") {
      const updateTodo = TodoService.updateTodo({
        id,
        text: editedTodoText,
        completed: false,
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updateTodo : todo))
      );

      setEditedTodoId(null);
      setEditedTodoText("");
    }
  };

  // deleting todo
  const handleDeleteTodo = (id: number) => {
    TodoService.deleteTodo(id);
    setTodos((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
  };
  return (
    <div className="container">
      {/* the todo list itself */}
      <div className="todos">
        {todos.map((todo) => (
          <div className="items" key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => {
                const updatedTodo = TodoService.updateTodo({
                  ...todo,
                  completed: !todo.completed,
                });
                setTodos((prev) =>
                  prev.map((t) => (t.id === todo.id ? updatedTodo : t))
                );
              }}
            />
            {editingTodoId == todo.id ? (
              <div className="edited-text">
                <input
                  type="text"
                  value={editedTodoText}
                  onChange={(e) => setEditedTodoText(e.target.value)}
                  autoFocus={true}
                />

                <button onClick={() => handleEditSave(todo.id)} title="Save">
                  {/* the uI representation of the edit button should be formed */}
                  Save
                </button>

                <button onClick={() => handleEditCancel()} title="Cancel">
                  {/* the uI representation of the edit button should be formed */}
                  Cancel
                </button>
              </div>
            ) : (
              <div className="edit-button">
                <span className={todo.completed ? "completed" : ""}>
                  {todo.text}
                </span>
                <button
                  onClick={() => handleEditStart(todo.id, todo.text)}
                  title="Edit"
                >
                  {/* edit button */}
                  Edit
                </button>
              </div>
            )}
            <button onClick={() => handleDeleteTodo(todo.id)} title="Delete">
              {/* the ui of the delete button */}
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* todo input form */}
      <div>
        <TodoForm setTodos={setTodos} />
      </div>
    </div>
  );
};
export default TodoList;
