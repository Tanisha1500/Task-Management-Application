import { useState } from "react";
import "./AddTask.css"
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import React from "react";
import type { Action } from "../../reducer/taskReducer";
import { Dialog } from "../../components/common /Dialog /Dialog";
import { Button } from "../../components/common /Buttons/Button";

interface Props{
  dispatch: React.Dispatch<Action>
}


export function AddTask({dispatch}:Props){

  {/* Use state */}
  const [title, setTitle]= useState("");
  const [description, setDescription]= useState("");
  const [showDialog, setShowDialog]=useState(false);
  const [dialogMessage, setDialogMessage]=useState("");

  const navigate= useNavigate();

  {/* Function */}
  const handleBack=()=>{
    navigate("/")
  }

  const handleAddTask =()=>{

    if(!title.trim() || !description.trim())
      {
      setDialogMessage("Please add a task!")
      setShowDialog(true);
      return;
      }
      

    dispatch({
      type:"ADD_TASK",
      payload:{
        id:crypto.randomUUID(),
        title,
        description,
        status:"pending",
        date: new Date().toISOString()
      }
    })


    setDialogMessage("You have added a task successfully!")
    setShowDialog(true);
    // navigate("/")
  }
  
    return (
        <div className="add-task-container">

        {/*Header */}
        <div className="header-container"> 
        <IoMdArrowRoundBack className="back-arrow" onClick={handleBack}/>
        {/* <button className="back-button"></button> */}
        <h2 className="header-title"> Add Task </h2>
        </div>

        {/*Body */}
        <div className="add-task-body">
           
            <textarea placeholder="Enter the title" className="title" onChange={(e)=>setTitle(e.target.value)}></textarea>
            <textarea placeholder="Enter the description" className="description" onChange={(e)=>setDescription(e.target.value)}></textarea>
        
        {/*Button area */}
        <div className="action-button">

      <Button variant="secondary" onClick={handleBack}>Cancel</Button>
      <Button variant="primary" onClick={handleAddTask}>ADD</Button>

      </div>
        </div>
        <Dialog
        open={showDialog}
        message={dialogMessage}
        secondaryLabel="Close"
        secondaryAction={()=>{
          setShowDialog(false);
          if(title.trim() || description.trim())
            {
           navigate("/")}}
            }
      />
        </div>
    )

}