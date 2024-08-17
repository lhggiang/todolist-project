import { useContext, useMemo, useRef, useState } from "react";
import "./App.css";
import TodoItem from "./components/TodoItem";
import Sidebar from "./components/Sidebar";
import FilterPanel from "./components/FilterPanel";
import { AppContext } from "./context/AppProvider";

function App() {
  const [todoList, setTodoList] = useState([
    {
      id: "1",
      name: "Đi học thêm",
      isImportant: true,
      isCompleted: false,
      isDeleted: false,
      category: "personal",
    },
    {
      id: "2",
      name: "Học bài",
      isImportant: false,
      isCompleted: false,
      isDeleted: false,
      category: "idea",
    },
    {
      id: "3",
      name: "Học võ",
      isImportant: true,
      isCompleted: true,
      isDeleted: false,
      category: "travel",
    },
    {
      id: "4",
      name: "Đi chợ",
      isImportant: false,
      isCompleted: true,
      isDeleted: false,
      category: "company",
    },
  ]);

  const [showSidebar, setShowSidebar] = useState(false);

  const [activeTodoItemId, setActiveTodoItemId] = useState();

  const [selectedFilterId, setSelectedFilterId] = useState("all");

  const activeTodoItem = todoList.find((todo) => todo.id === activeTodoItemId);

  const [searchText, setSearchText] = useState("");

  const inputRef = useRef();

  const { selectedCategoryId } = useContext(AppContext);
  // console.log(inputRef);

  const handleCompleteCheckboxChange = (todoId) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodoList(newTodoList);
  };

  const handleTodoItemChange = (newTodo) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === newTodo.id) {
        return newTodo;
      }
      return todo;
    });
    setTodoList(newTodoList);
  };

  const handleTodoItemClick = (todoId) => {
    setShowSidebar(true);
    setActiveTodoItemId(todoId);
  };

  const filterTodos = useMemo(() => {
    return todoList.filter((todo) => {
      if (!todo.name.includes(searchText)) {
        return false;
      }
      if (selectedCategoryId && todo.category !== selectedCategoryId) {
        return false;
      }
      switch (selectedFilterId) {
        case "all":
          return true;
        case "important":
          return todo.isImportant;
        case "completed":
          return todo.isCompleted;
        case "delete":
          return todo.isDeleted;
        default:
          return true;
      }
    });
  }, [todoList, selectedFilterId, searchText, selectedCategoryId]);

  const handleChange = (event) => {
    if (event.key === "Enter") {
      setTodoList([
        ...todoList,
        {
          id: crypto.randomUUID(),
          name: event.target.value,
          isImportant: false,
          isCompleted: false,
          isDeleted: false,
          category: "personal",
        },
      ]);
      inputRef.current.value = "";
    }
  };

  return (
    <div className="container">
      <FilterPanel
        selectedFilterId={selectedFilterId}
        setSelectedFilterId={setSelectedFilterId}
        searchText={searchText}
        setSearchText={setSearchText}
        todoList={todoList}
      />
      <div className="main-content">
        <input
          ref={inputRef}
          type="text"
          name="add-new-task"
          placeholder="Add new task"
          className="task-input"
          onKeyDown={handleChange}
        />
        <div>
          {filterTodos.map((todo) => {
            return (
              <TodoItem
                id={todo.id}
                name={todo.name}
                key={todo.id}
                isImportant={todo.isImportant}
                isCompleted={todo.isCompleted}
                handleCompleteCheckboxChange={handleCompleteCheckboxChange}
                handleTodoItemClick={handleTodoItemClick}
              />
            );
          })}
        </div>
        {showSidebar && (
          <Sidebar
            key={activeTodoItemId}
            todoItem={activeTodoItem}
            handleTodoItemChange={handleTodoItemChange}
            setShowSidebar={setShowSidebar}
          />
        )}
      </div>
    </div>
  );
}
export default App;
