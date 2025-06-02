import { connect } from "@/app/lib/db";
import { RowDataPacket } from "mysql2";
import type { Todo } from "@/type";

export const addTodoQuery = async (
    task: string,
    image: string,
    checked?: boolean
) => {
    const connection = await connect();
    await connection.query(
        "INSERT INTO todo (task,name,checked) VALUES (?,?,?)",
        [task, image, checked || null]
    );
};

export const getAllTodoQuery = async (): Promise<Todo[]> => {
    try {
        const connection = await connect();
        const [rows] = await connection.query<Todo[] & RowDataPacket[]>(
            "SELECT * FROM todo"
        );
        return rows;
    } catch (error) {
        throw error;
    }
};

export const deleteTodoQuery = async (id: number): Promise<void> => {
    try {
        const connection = await connect();
        console.log("Deleting todo with id:", id);
        await connection.query("DELETE FROM todo WHERE id = ?", [id]);
    } catch (error) {
        throw error;
    }
};

export const doneTodoQuery = async (id: number): Promise<void> => {
    try {
        const connection = await connect();
        console.log("Marking todo as done with id:", id);
        await connection.query("UPDATE todo SET checked = 1 WHERE id = ?", [
            id,
        ]);
    } catch (error) {
        throw error;
    }
};
