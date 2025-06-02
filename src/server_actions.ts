"use server";

import { connect } from "./app/lib/db";

export type ServerFeedback = {
    task: string;
    name: string;
    checked: boolean;
};

export async function addTodo(data: {
    task: string;
    name: string;
    checked: boolean;
}): Promise<ServerFeedback> {
    const { task, name, checked } = data;
    if (!task || !name) {
        throw new Error("Missing required fields");
    }

    const conn = await connect();
    await conn.execute(
        "INSERT INTO tasks (task, name, checked) VALUES (?, ?, ?)",
        [task, name, checked]
    );

    return { task, name, checked };
}
