export type Task = {
    id: string;
    title: string;
    details?: string;
    dueDate?: string;
    completed: boolean;
    taskListId: string;
};

export type CreateTaskInput = {
    title: string;
    details?: string;
    dueDate?: string;
};