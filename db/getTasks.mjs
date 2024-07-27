import { promisify } from "util";
import {getDb} from "./func/getDb.mjs";
import {config} from "./func/config.mjs";

export async function getTasks(to_path=config.work_database) {
    let db;
    try {
        db = getDb(to_path);
        // Промисифицируем методы run и get
        const runAsync = promisify(db.run.bind(db));
        const getAsync = promisify(db.all.bind(db));

        await runAsync("CREATE TABLE IF NOT EXISTS tasks (" +
            "id INTEGER PRIMARY KEY AUTOINCREMENT," +
            "name TEXT, create_at TEXT, status INTEGER DEFAULT 1, amount INTEGER, url TEXT)");

        return await getAsync('SELECT * FROM tasks ORDER BY id DESC', []);

    } catch (e) {
        console.log(e);
        return [];
    } finally {
        if (db) {
            db.close();
        }
    }
}

