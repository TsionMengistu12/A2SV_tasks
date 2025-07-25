import TodoList from "./component/TodoList";
import "./CSS/App.css";
function App() {
  return (
    <div className="App">
      <div className="header">
        <h1> To-do List</h1>
      </div>
      <TodoList />
    </div>
  );
}

export default App;
