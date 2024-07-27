import { promisify } from "util";
import {getDb} from "./func/getDb.mjs";
import {config} from "./func/config.mjs";

export async function setStatusUser(index, status, to_path=config.work_database) {
    let db;
    try {
        db = getDb(to_path);
        const getAsync = promisify(db.get.bind(db));
        await getAsync('UPDATE users SET status = ? WHERE id = ?', [status, index]);
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

