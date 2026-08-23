import type { Task } from "./task.js";

export const tasks: Task[] = [
    {
        id: "1",
        title: "Finish project setup",
        completed: true,
        taskListId: "list-1"
    },
    {
        id: "2",
        title: "Build dashboard",
        completed: false,
        taskListId: "list-2"
    },
    {
        id: "3",
        title: "Connect Google Tasks API",
        completed: false,
        taskListId: "list-2"
    },
    {
        id: "4",
        title: "Buy groceries",
        completed: false,
        taskListId: "list-3"
    }
];