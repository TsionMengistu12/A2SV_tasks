import type { TodoTypes } from "./todo";

const LOCAL_STORAGE_KEY = "todos";

const TodoService ={

    // Get operation
    getTodo: ():TodoTypes[] =>{
        const todoStr = localStorage.getItem(LOCAL_STORAGE_KEY)
        return todoStr?JSON.parse(todoStr):[];
    },
    // Add operation

    addTodo: (text:string):TodoTypes => {
        const todos = TodoService.getTodo();
        const newTodo: TodoTypes = {id:todos.length + 1, text, completed:false};

        const updateTodos = [...todos, newTodo]
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos));

        return newTodo;
    },

    //update operation
    updateTodo: (todo: TodoTypes) : TodoTypes =>{
        const todos = TodoService.getTodo();
        const updateTodos = todos.map((t) => (t.id === todo.id? todo : t));

        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos));
        return todo;

    },

    //delete operation
    deleteTodo: (id:number) : void =>{
        const todos = TodoService.getTodo();

        const updateTodos = todos.filter((todo) => todo.id !== id);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos));
    }

};
export default TodoService;