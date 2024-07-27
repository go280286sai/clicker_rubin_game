import { promisify } from 'util';
import {getDb} from "./func/getDb.mjs";
import {config} from "./func/config.mjs";

export async function cleanTasks(to_path=config.work_database) {
    let db;
    try {
        db = getDb(to_path);
        const runAsync = promisify(db.run.bind(db));
        await runAsync('DELETE FROM tasks');
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

