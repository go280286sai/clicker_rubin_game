import { promisify } from "util";
import {getData} from "./func/getData.mjs";
import {getDb} from "./func/getDb.mjs";
import {config} from "./func/config.mjs";

export async function insertTasks(name, amount, url, to_path=config.work_database) {
    let db;
    try {
        const formattedDate = getData();
        db = getDb(to_path);
        // Промисифицируем методы run и get
        const runAsync = promisify(db.run.bind(db));
        const getAsync = promisify(db.get.bind(db));

        await runAsync("CREATE TABLE IF NOT EXISTS tasks (" +
            "id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, create_at TEXT, " +
            "status INTEGER DEFAULT 1, amount INTEGER, url TEXT)");

        await getAsync('INSERT INTO tasks (name, create_at, status, amount, url) VALUES (?, ?, ?, ?, ?)',
            [name, formattedDate, 1, amount, url]);
        return true;

    } catch (e) {
        console.log(e);
        return false;
    } finally {
        if (db) {
            db.close();
        }
    }
}

