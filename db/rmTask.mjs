import sqlite3 from "sqlite3";
import { promisify } from "util";
import path from "path";
import {config} from "./func/config.mjs";
import {getDb} from "./func/getDb.mjs";

export async function rmTask(index, to_path=config.work_database) {
    let db;
    try {
        db = getDb(to_path);
        const getAsync = promisify(db.get.bind(db));
        await getAsync('DELETE FROM tasks WHERE id = ?', [index]);
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

