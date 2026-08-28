import type { Task } from "./task.js";
import { tasks } from "./fakeTasks.js";

let selectedTaskListId = "list-1";

export function getTasks(): Task[] {
    return tasks;
}

export function setTaskCompleted(
    taskId: string,
    completed: boolean
): void {
    const task = tasks.find((task) => task.id === taskId);

    if (!task) {
        return;
    }

    task.completed = completed;
}

export function addTask(title: string): void {
    const newTask: Task = {
        id: crypto.randomUUID(),
        title,
        completed: false,
        taskListId: selectedTaskListId
    };

    tasks.push(newTask);
}

export function getSelectedTaskListId(): string {
    return selectedTaskListId;
}

export function setSelectedTaskListId(taskListId: string): void {
    selectedTaskListId = taskListId;
}

export function getTasksForSelectedList(): Task[] {
    return tasks.filter(
        (task) => task.taskListId === selectedTaskListId
    );
}