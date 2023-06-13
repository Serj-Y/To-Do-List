
export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

export type FilterValuesType = "all" | "completed" | "active";

export type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType;
};
export type TaskStateType = {
    [key: string]: Array<TaskType>
  };
