import { promisify } from "util";
import {getDb} from "./func/getDb.mjs";
import {config} from "./func/config.mjs";

export async function insertUsersTasks(user_id, task_id, to_path=config.work_database) {
    let db;
    try {
        db = getDb(to_path);
        const getAsync = promisify(db.get.bind(db));
        await getAsync('INSERT INTO users_tasks (users_id, tasks_id) VALUES (?, ?)',
            [user_id, task_id]);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    } finally {
            db.close();
    }
}

