import React, {useState}  from "react"
import {isEmpty, size} from 'lodash'
import shortid from 'shortid'


function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [id, setId] = useState("")

  const addTask = (e )=>{
    e.preventDefault()
    if (isEmpty(task)){
      console.log("Task empty")
      return
    }
    const newTask = {
      id: shortid.generate(),
      name: task
    }
    setTasks([ ...tasks, newTask])
    
    setTask("")
  }
  const saveTask = (e )=>{
    e.preventDefault()
    if (isEmpty(task)){
      console.log("Task empty")
      return
    }
   
    const editedtasks = tasks.map(item => item.id === id ? {id, name: task} : item)
    setTasks(editedtasks)
    setEditMode(false)
    setTask("")
    setId("")
  }

  const deleteTask = (id)=>{
    const filteredTasks = tasks.filter(task => task.id !== id )
    setTasks(filteredTasks)
  }
  const editTask = (theTask)=>{
    setTask(theTask.name)
    setEditMode(true)
    setId(theTask.id)
  }
  return (
    <div className="container mt-5">
      <h1>HOMEWORK</h1>
      <hr/>
      <div className="row">
        <dib className="col-8">
          <h4 className="text-center">List of Homework</h4>
          {
            size(tasks) == 0  ? (
            <h5 className="text-center">NO TASKS</h5>
            ):(

            
          <ul className="list-group">
          {
            tasks.map((task)=>(
          <li className="list-grup-item" key={task.id}>
            <span className="lead">{task.name}</span>
            
            <button
             className="btn btn-danger btn-sm float-right"
             onClick={()=> deleteTask(task.id)}>               
               Delete 
            </button>

            <button 
            className="btn btn-warning btn-sm float-right mx-2"  
            onClick={()=> editTask(task)}          
            >
              Edit
            </button>

           
          </li>
          ))
          }
          </ul>
            )
          }
        </dib>
        <dib className="col-4">
        <h4 className="text-center">
          {editMode ?"Edit Task" : "Form"}
        </h4>
        <form onSubmit={editMode ? saveTask : addTask}>
          <input
          type="text"
          className="form-control mb-2"
          placeholder="Enter Task..."
          onChange={(text)=>setTask(text.target.value)}
          value={task}
          />
          <button className={  editMode ?
             "btn btn-warning btn-block" : "btn btn-dark btn-block"
          }
          type="submit">
            { editMode ? "Save" : "Add"} 
          </button>
        </form>
        </dib>
      </div>
    </div>
  )
}

export default App
