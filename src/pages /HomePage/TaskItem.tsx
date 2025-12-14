import { useState } from "react";
import type { Action } from "../../reducer/taskReducer";
import type { Task } from "../../types/task";
import { FaCheck, FaChevronDown, FaChevronUp, FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { Dialog } from "../../components/common /Dialog /Dialog";
import { useNavigate } from "react-router-dom";

interface Props {
  title: String
  tasks: Task[],
  dispatch: React.Dispatch<Action>
}


export function TaskItem({ title, tasks, dispatch }: Props) {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<String | null>(null);

  const handleEditTask = (taskId: String) => {
    navigate(`/edit-task/${taskId}`)

  }

  const handleDeleteTaskClicked = (taskId: String) => {
    setTaskToDelete(taskId);
    setDialog(true);
  }

  const handleDeleteTask = () => {


    console.log(taskToDelete);
    if (taskToDelete) {
      dispatch({
        type: "DELETE_TASK",
        payload: { id: taskToDelete }
      })

      // setDialog(false);
      setTaskToDelete(null);
    }


  }


  console.log(tasks);
  return (
    <>
      <div className="section-header" onClick={() => setOpen(!open)}>
        <div className="section-title">{title} ({tasks.length})</div>
        {open ? <FaChevronDown className="chevron-icon" /> : <FaChevronUp className="chevron-icon" />}
      </div>
      {open && tasks.map((task) => (


        <div className="task-item">
          {/* Row 1: Title (left) + Status (right) */}
          <div className="task-row task-row-1">
            <div className="task-title-container">
              <span className={`task-avatar ${task.status === "completed" ? "completed-dot" : ""}`}> {task.status === "completed" ? <FaCheck /> : task.title.charAt(0).toUpperCase()}</span>
              <h4 className={`task-title ${task.status === "completed" ? "completed-title" : ""}`}>{task.title}</h4>
            </div>

            <div className="task-status">
              <span
                className={`status-dot ${title
                  .toLowerCase()
                  .split(" ")
                  .join("-")}`}
              />
              <span className="status-text">{title}</span>
            </div>
          </div>

          {/* Row 2: Description */}
          <div className="task-row task-row-2">
            <p className="task-description">{task.description}</p>
          </div>

          {/* Row 3: Date (left) + Actions (right) */}
          <div className="task-row task-row-3">
            <span className="task-date"> {new Date(task.date).toLocaleDateString("en-US", {
              month: "long",
              day: "2-digit",
              year: "numeric",
            })}</span>

            <div className="task-actions">
              <MdEdit className="icon edit-icon" onClick={() => handleEditTask(task.id)} />
              <FaTrash className="icon delete-icon" onClick={() => { handleDeleteTaskClicked(task.id) }} />
            </div>
          </div>
        </div>
      ))}
      <Dialog
        open={dialog}
        message="Are you sure you want to delete the task?"
        primaryLabel="Confirm"
        primaryAction={handleDeleteTask}
        secondaryLabel="Cancel"
        secondaryAction={() => {
          setDialog(false);
        }}
      />
    </>
  )
}