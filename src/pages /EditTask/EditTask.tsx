import { useNavigate, useParams } from "react-router-dom";
import type { Action } from "../../reducer/taskReducer";
import type { Task, TaskStatus } from "../../types/task";
import { useState } from "react";
import { Button } from "../../components/common /Buttons/Button";
import { IoMdArrowRoundBack } from "react-icons/io";
import { STATUS_OPTIONS } from "../../data/status";
import './EditTask.css'
import Dropdown from "../../components/common /DropDown/Dropdown";
import { Dialog } from "../../components/common /Dialog /Dialog";

interface EditTaskProps {
  tasks: Task[];
  dispatch: React.Dispatch<Action>;
}
export const EditTask = ({ tasks, dispatch }: EditTaskProps) => {

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  console.log(id);

  const taskToEdit = tasks.find((t) => t.id === id)

  const [title, setTitle] = useState<string>(String(taskToEdit?.title ?? ""));
  const [description, setDescription] = useState<string>(String(taskToEdit?.description || ""));
  const [status, setStatus] = useState(
    STATUS_OPTIONS.find(
      (opt) => opt.value === taskToEdit?.status
    ) || STATUS_OPTIONS[0]
  );
  const [dialog, setDialog] = useState(false);



  const handleBack = () => {
    navigate("/")
  }

  const handleEditTask = () => {
    if (!taskToEdit) return;


    dispatch({
      type: "UPDATE_TASK",
      payload: {
        id: taskToEdit.id,
        updates: {
          title,
          description,
          status: status.value as TaskStatus,
        },
      },
    });

    setDialog(true);


  };

  return (
    <>
      <div className="add-task-container">

        {/*Header */}
        <div className="header-container">
          <IoMdArrowRoundBack className="back-arrow" onClick={handleBack} />
          {/* <button className="back-button"></button> */}
          <h2 className="header-title"> Edit Task </h2>
        </div>

        {/*Body */}
        <div className="add-task-body">

          <textarea value={title} placeholder="Enter the title" className="title" onChange={(e) => setTitle(e.target.value)}></textarea>
          <textarea value={description} placeholder="Enter the description" className="description" onChange={(e) => setDescription(e.target.value)}></textarea>
          <Dropdown options={STATUS_OPTIONS} value={status} onChange={(selectedStatus) => setStatus(selectedStatus)} />


          {/*Button area */}
          <div className="action-button">

            <Button variant="secondary" onClick={handleBack} >Cancel</Button>
            <Button variant="primary" onClick={handleEditTask} >UPDATE</Button>

          </div>
        </div>
      </div>

      <Dialog
        open={dialog}
        message="You have updated the task"
        secondaryLabel="Close"
        secondaryAction={() => {
          setDialog(false);
          if (title.trim() || description.trim()) {
            navigate("/")
          }
        }
        }
      />
    </>
  )
}