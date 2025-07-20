import React, { useState } from "react";
import type { TodoTypes } from "../todo";
import TodoService from "../TodoService";

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
    setEditedTodoId("");
  };

  return <div></div>;
};
export default TodoList;
