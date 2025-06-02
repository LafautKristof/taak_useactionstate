"use client";

import { useState } from "react";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Todo } from "@/type";

import { addTodo } from "@/server_actions";

type Props = {
    tasks: Todo[];
    addTodo: typeof addTodo;
};

export default function TodoListClient({ tasks, addTodo }: Props) {
    const [returnedState, actionFunction, isPending] = useActionState(addTodo, {
        task: "",
        name: "",
        checked: false,
    });

    const [newTask, setNewTask] = useState("");
    const [newName, setNewName] = useState("");

    return (
        <div className="space-y-6">
            <ul className="space-y-2">
                {tasks.map((t) => (
                    <li key={t.id} className="p-2 border rounded">
                        {t.task}
                    </li>
                ))}
            </ul>

            <form
                action={actionFunction}
                className="flex flex-col space-y-2 max-w-sm"
            >
                <Input
                    name="task"
                    placeholder="Task"
                    value={newTask}
                    onChange={(e) => setNewTask(e.currentTarget.value)}
                    required
                />
                <Input
                    name="name"
                    placeholder="Name"
                    value={newName}
                    onChange={(e) => setNewName(e.currentTarget.value)}
                    required
                />
                <Button type="submit" disabled={isPending}>
                    {isPending ? "Adding…" : "Submit"}
                </Button>
            </form>

            {returnedState && (
                <p className="mt-2 text-green-600">
                    Added: {returnedState.task}
                </p>
            )}
        </div>
    );
}
