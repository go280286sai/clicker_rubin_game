import {promisify} from "util";
import {getDb} from "./func/getDb.mjs";
import {config} from "./func/config.mjs";

export async function getInvite(user_id, to_path = config.work_database) {
    let db;
    try {
        db = getDb(to_path);
        const getAsync = promisify(db.get.bind(db));
        return await getAsync('SELECT name, amount FROM users WHERE id = ?', [user_id]);
    } catch (e) {
        console.log(e);
        return [];
    } finally {
        if (db) {
            db.close();
        }
    }
}

