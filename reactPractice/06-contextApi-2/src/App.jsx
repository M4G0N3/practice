
import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './Contexts'
import TodoForm from "./components/TodoForm.jsx";
import TodoItem from "./components/TodoItem.jsx";

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos( (prevTodo) => [{id: Date.now(), ...todo}, ...prevTodo] )
  }


  const updateTodo = (id, todo) => {
    setTodos((prevTodo) => prevTodo.map((prev) => (prev.id === id ? todo : prev)));
  };




  const deleteTodo = (id) => {
    setTodos( (prevTodo) => prevTodo.filter((todo) => todo.id !== id) )
  }

  const ToggleComplete = (id) => {
    //console.log(id)
    setTodos(
        (prevTodo) => prevTodo.map( (prev) => prev.id === id ? {...prev, completed: !prev.completed} : prev ) )
  }

  
  useEffect(() => {
    const todoJsonGet = JSON.parse(localStorage.getItem("todos"))
    if (todoJsonGet && todoJsonGet.length > 0) {
      setTodos(todoJsonGet)
    }

    }, [])

  useEffect(() => {
      localStorage.setItem("todos", JSON.stringify(todos))

  }, [todos])




  return (
    <TodoProvider value={ {todos, addTodo, updateTodo, deleteTodo, ToggleComplete} }>
      <div className="bg-[#172842] min-h-screen py-8">
      <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
              {/* Todo form goes here */}
              <TodoForm/>
          </div>
          <div className="flex flex-wrap gap-y-3">
              {/*Loop and Add TodoItem here */}
              {todos.map((todo) => (
                  <div key={todo.id} className="w-full">
                      <TodoItem todo={todo} />
                  </div>
              ))}

          </div>
      </div>
  </div>
    </TodoProvider>
  )
}

export default App
