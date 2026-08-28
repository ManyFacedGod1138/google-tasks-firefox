import {
    
    getSelectedTaskListId,
    getTasksForSelectedList,
    setSelectedTaskListId,
    setTaskCompleted,
    addTask,
    loadTasks,
    deleteTask
} from "../tasks/taskStore.js";

import { taskLists } from "../tasks/fakeTaskLists.js";


const taskList = document.getElementById("task-list");
const completedCount = document.getElementById("completed-count");
const pendingCount = document.getElementById("pending-count");
const taskListNavigation = document.getElementById("task-list-navigation");

const newTaskForm = document.getElementById(
    "new-task-form"
) as HTMLFormElement | null;

const newTaskTitle = document.getElementById(
    "new-task-title"
) as HTMLInputElement | null;


const newTaskDialog = document.getElementById(
    "new-task-dialog"
) as HTMLDialogElement | null;

const openNewTaskDialogButton = document.getElementById(
    "open-new-task-dialog"
);

const cancelNewTaskButton = document.getElementById(
    "cancel-new-task"
);

openNewTaskDialogButton?.addEventListener("click", () => {
    newTaskDialog?.showModal();
});

cancelNewTaskButton?.addEventListener("click", () => {
    newTaskDialog?.close();
});

const newTaskDetails = document.getElementById(
    "new-task-details"
) as HTMLTextAreaElement | null;

const newTaskDueDate = document.getElementById(
    "new-task-due-date"
) as HTMLInputElement | null;

newTaskForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!newTaskTitle) {
        return;
    }

    const title = newTaskTitle.value.trim();

    if (!title) {
        return;
    }

    await addTask({
        title,
        details: newTaskDetails?.value.trim() || undefined,
        dueDate: newTaskDueDate?.value || undefined
    });
    newTaskForm.reset();
    newTaskDialog?.close();

    renderDashboard();
});

async function initializeDashboard(): Promise<void> {
    await loadTasks();
    renderDashboard();
}



function renderStatistics(): void {
    const tasks = getTasksForSelectedList();

    const completedTasks = tasks.filter((task) => task.completed);
    const pendingTasks = tasks.filter((task) => !task.completed);

    if (completedCount) {
        completedCount.textContent = completedTasks.length.toString();
    }

    if (pendingCount) {
        pendingCount.textContent = pendingTasks.length.toString();
    }
}


function renderTasks(): void {
    const tasks = getTasksForSelectedList();
    
    if (!taskList) {
        return;
    }

    taskList.innerHTML = "";

    tasks.forEach((task) => {
        const listItem = document.createElement("li");
        const checkbox = document.createElement("input");
        const label = document.createElement("span");
        const deleteButton = document.createElement("button");

        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", async () => {
            await setTaskCompleted(task.id, checkbox.checked);
            renderDashboard();
        });
        
        label.textContent = task.title + " ";
        
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", async () => {
            await deleteTask(task.id);
            renderDashboard();
        });

        listItem.append(checkbox, label, deleteButton);
        taskList.appendChild(listItem);
    });
}

function renderDashboard(): void {
    renderTaskLists();
    renderTasks();
    renderStatistics();
}

function renderTaskLists(): void {
    if (!taskListNavigation) {
        return;
    }

    taskListNavigation.innerHTML = "";

    const selectedTaskListId = getSelectedTaskListId();

    taskLists.forEach((taskList) => {
        const listItem = document.createElement("li");
        const button = document.createElement("button");

        button.type = "button";
        button.textContent = taskList.title;

        if (taskList.id === selectedTaskListId) {
            button.disabled = true;
        }

        button.addEventListener("click", () => {
            setSelectedTaskListId(taskList.id);
            renderDashboard();
        });

        listItem.appendChild(button);
        taskListNavigation.appendChild(listItem);
    });
}


initializeDashboard();