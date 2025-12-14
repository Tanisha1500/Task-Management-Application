import type { Task } from "../types/task";

export type Action =
    |{type:"ADD_TASK"; payload:Task}
    |{type:"UPDATE_TASK"; payload:{ id:String; updates: Partial<Pick<Task,"title"|"description"|"status"|"date">>}}
    |{type:"DELETE_TASK"; payload:{id:String}}


    export function taskReducer( state: Task[], action:Action):Task[]{
        switch(action.type)
        {
            case "ADD_TASK":
            return [...state, action.payload];

            case "DELETE_TASK":
                return state.filter(task=>task.id!==action.payload.id);

            case "UPDATE_TASK":
                    return state.map(task=>
                        task.id===action.payload.id
                        ?{...task, ...action.payload.updates}
                        :task
                    )
            default :
            return state;
        }
    }