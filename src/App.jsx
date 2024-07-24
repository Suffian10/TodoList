import { useRef, useState, useEffect } from 'react'
import './App.css'
import { FaEdit } from "react-icons/fa";
import { MdAddCircleOutline, MdDone, MdOutlineDoneOutline } from "react-icons/md";
import { FaDeleteLeft } from 'react-icons/fa6';


function App() {
  const [todo, setTodo] = useState([])
  const [edit, setEdit] = useState(false)
  const [done, setdone] = useState(false)
  const [editIndex, setEditIndex] = useState(0)

  useEffect(() => {
    const storedTodo = localStorage.getItem('todos')
    if (storedTodo) {
      setTodo(JSON.parse(storedTodo))
    }

  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todo))
  }, [todo]);
  const inputRef = useRef(null)
  const addTask = () => {
    if (inputRef.current.value === "") {
      alert("Empty input field insert text")
    }
    else {
      setTodo([...todo,{text:inputRef.current.value,done:false}])
      inputRef.current.value = ""
    }
  }


  const deleteTodo = (index) => {
    const todo2 = [...todo]
    todo2.splice(index, 1)
    setTodo(todo2)
  }
  const editTodo = (index) => {
    if (!edit) {
      setEdit(true)
      setEditIndex(index)
      inputRef.current.value = todo[index].text
    }
    else {
      alert(`You are already editing Task no ${editIndex + 1} finish it editing first`)
    }
  }
  const updateTodo = () => {
    if (edit) {
      const newTodo = [...todo]
      newTodo[editIndex].text = inputRef.current.value
      setTodo(newTodo)
      setEdit(false)
      inputRef.current.value = ""
    }
  }

  const donetodo = (index) => {
    const newTodo=[...todo]
    newTodo[index].done= !newTodo[index].done
    setTodo(newTodo)
  }
  return (
    <>
      <div className="container items-center text-center mx-auto w-11/12 ">
        <div className='border p-2 flex justify-around items-center mb-4'>
          <input type="text" name="" id="" placeholder='Enter' ref={inputRef} className='w-6/12 border border-red-800' />
          {edit ?
            <button onClick={updateTodo}><MdOutlineDoneOutline /></button>
            :
            <button onClick={addTask}><MdAddCircleOutline /></button>
          }
        </div>
        <div className='space-y-2'>
          {todo.map((item, index) => (
            <span key={index} className='flex justify-between items-center border p-2'>
              <h1>{index + 1}</h1>
              <h1 className={item.done ? 'line-through ':""} key={index}>{item.text}</h1>
              <div className='ml-10 gap-5 flex flex-row-reverse'>
                <button onClick={() => deleteTodo(index)}>
                  <FaDeleteLeft />
                </button>
                <button onClick={() => editTodo(index)}>
                  <FaEdit />
                </button>
                <button onClick={()=> donetodo(index)}><MdDone /></button>
              </div>
            </span>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
