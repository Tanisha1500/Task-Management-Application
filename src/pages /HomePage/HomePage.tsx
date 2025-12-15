import { IoMdAdd } from "react-icons/io";
import "./HomePage.css"
import { useNavigate } from "react-router-dom";
import { SearchBox } from "../../components/common /Search/SearchBox";
import type { Action } from "../../reducer/taskReducer";
import type { Task } from "../../types/task";
import { TaskItem } from "./TaskItem";
import { useState } from "react";
import Dropdown, { type DropdownOption } from "../../components/common /DropDown/Dropdown";
import { FILTER_OPTIONS } from "../../data/filter";

interface Props {
  tasks: Task[];
  dispatch: React.Dispatch<Action>;
}
export function HomePage({ tasks, dispatch }: Props) {

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const handleAddTask = () => {
    navigate("/add");
  }

  // Filter tasks based on searchTerm and selected filter
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.status.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filter === "all" ? true : task.status === filter;

    return matchesSearch && matchesFilter;
  });


  const pending = filteredTasks.filter((task) => task.status === "pending");
  const inProgress = filteredTasks.filter((task) => task.status === "in-progress");
  const completed = filteredTasks.filter((task) => task.status === "completed");


  return (
    <div className="home-page-container">
      {/*Header */}
      <div className="header-container">
        <h2 className="header-title">
          TO-DO APP
        </h2>
      </div>
      {/*Body of the home page */}
      <div className="search-box-body">
        <SearchBox value={searchTerm} onChange={setSearchTerm} />

      </div>
      <div className="filter">
        <Dropdown
          placeholder="Filter tasks by"
          options={FILTER_OPTIONS}
          value={FILTER_OPTIONS.find(opt => opt.value === filter) as DropdownOption}
          onChange={(option) => setFilter(option.value)}
        />
      </div>
      {filteredTasks.length === 0 ? (
        <div className="empty-text"> Oops! You have no added any tasks yet</div>
      ) : (
        <>
          {inProgress.length > 0 && (
            <TaskItem title="In Progress" tasks={inProgress} dispatch={dispatch} />
          )}
          {pending.length > 0 && (
            <TaskItem title="Pending" tasks={pending} dispatch={dispatch} />
          )}
          {completed.length > 0 && (
            <TaskItem title="Completed" tasks={completed} dispatch={dispatch} />
          )}
        </>
      )}
      <button className="add-button" onClick={handleAddTask}>
        <IoMdAdd size={36} color="white" />
      </button>
    </div>
  )
}