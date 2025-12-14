import { useEffect, useReducer, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { HomePage } from "./pages /HomePage/HomePage";
import { AddTask } from "./pages /Add Task/AddTask";
import { taskReducer } from "./reducer/taskReducer";
import type { Task } from "./types/task";
import { EditTask } from "./pages /EditTask/EditTask";

const initialState:Task[]=[]
function App() {
  const [tasks, dispatch]= useReducer(taskReducer, initialState, ()=>{
    const savedTasks=localStorage.getItem("tasks");
    return savedTasks?JSON.parse(savedTasks):[];
  })

  useEffect(()=>{
    localStorage.setItem("tasks",JSON.stringify(tasks))
  },[tasks]);
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage tasks={tasks} dispatch={dispatch} /> } /> {/* Home page */}
        <Route path="/add" element={<AddTask dispatch={dispatch}/>} /> {/* AddTask page */}
        <Route path="/edit-task/:id" element={<EditTask tasks={tasks} dispatch={dispatch} />}/> 
      </Routes>
    </Router>
  );
}

export default App;
