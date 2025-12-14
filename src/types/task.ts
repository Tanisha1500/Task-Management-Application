export type TaskStatus="completed"| "in-progress"|"pending"

export interface Task {
    id:String;
    title:String;
    description:String;
    status:TaskStatus;
    date:string;

}
