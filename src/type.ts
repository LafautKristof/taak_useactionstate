export interface Todo {
    id: number;
    task: string;
    name: string;
    checked: boolean;
}

export interface ServerFeedback {
    task: string;
    name: string;
    checked: boolean;
}
