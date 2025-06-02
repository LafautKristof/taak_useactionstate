import TodoListClient from "@/components/TodoListClient";
import { addTodo } from "@/server_actions";

import { connect } from "./lib/db";

const page = async () => {
    const conn = await connect();
    const [rows] = await conn.query("SELECT * FROM tasks");
    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold mb-4">My Todo List</h1>
            <TodoListClient
                tasks={
                    rows as {
                        id: number;
                        task: string;
                        name: string;
                        checked: boolean;
                    }[]
                }
                addTodo={addTodo}
            />
        </main>
    );
};
export default page;
