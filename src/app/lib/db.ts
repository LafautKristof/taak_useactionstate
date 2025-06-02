import { Connection, ConnectionOptions } from "mysql2/promise";
import mysql from "mysql2/promise";

const connOptions: ConnectionOptions = {
    host: "localhost",
    user: "root",
    password: process.env.PASSWORD,
    database: "taak_useserveractions",
    connectionLimit: 10,
};

let connection: Connection | undefined;

export async function connect(): Promise<Connection> {
    if (connection) return connection;
    connection = await mysql.createConnection(connOptions);
    return connection;
}
