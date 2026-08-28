import type { Task, CreateTaskInput } from "./task.js";
import { tasks as fakeTasks } from "./fakeTasks.js";

let tasks: Task[] = [...fakeTasks];

let selectedTaskListId = "list-1";

export function getTasks(): Task[] {
    return tasks;
}

export async function deleteTask(taskId: string): Promise<void> {
    tasks = tasks.filter((task) => task.id !== taskId);

    await saveTasks();
}

export function getTasksForSelectedList(): Task[] {
    return tasks.filter(
        (task) => task.taskListId === selectedTaskListId
    );
}

export function getSelectedTaskListId(): string {
    return selectedTaskListId;
}

export function setSelectedTaskListId(taskListId: string): void {
    selectedTaskListId = taskListId;
}

export async function loadTasks(): Promise<void> {
    const result = await browser.storage.local.get("tasks");

    if (Array.isArray(result.tasks)) {
        tasks = result.tasks;
    }
}

async function saveTasks(): Promise<void> {
    await browser.storage.local.set({
        tasks
    });
}

export async function addTask(
    input: CreateTaskInput
): Promise<void> {
    const newTask: Task = {
        id: crypto.randomUUID(),
        title: input.title,
        details: input.details,
        dueDate: input.dueDate,
        completed: false,
        taskListId: selectedTaskListId
    };

    tasks.push(newTask);
    await saveTasks();
}

export async function setTaskCompleted(
    taskId: string,
    completed: boolean
): Promise<void> {
    const task = tasks.find((task) => task.id === taskId);

    if (!task) {
        return;
    }

    task.completed = completed;

    await saveTasks();
}