type Task = {
    id: string;
    title: string;
    completed: boolean;
};

const tasks: Task[] = [
    {
        id: "1",
        title: "Finish project setup",
        completed: true
    },
    {
        id: "2",
        title: "Build dashboard",
        completed: false
    },
    {
        id: "3",
        title: "Connect Google Tasks API",
        completed: false
    }
];

const taskList = document.getElementById("task-list");
const completedCount = document.getElementById("completed-count");
const pendingCount = document.getElementById("pending-count");

const completedTasks = tasks.filter((task) => task.completed);
const pendingTasks = tasks.filter((task) => !task.completed);

if (completedCount) {
    completedCount.textContent = completedTasks.length.toString();
}

if (pendingCount) {
    pendingCount.textContent = pendingTasks.length.toString();
}

if (taskList) {
    tasks.forEach((task) => {
        const listItem = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        const label = document.createElement("span");
        label.textContent = task.title;

        listItem.append(checkbox, label);
        taskList.appendChild(listItem);
    });
}