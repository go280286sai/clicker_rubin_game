import {promisify} from "util";
import {getDb} from "./func/getDb.mjs";
import {config} from "./func/config.mjs";

export async function settInvite(user_id, invite_id, to_path = config.work_database) {
    let db;
    try {
        db = getDb(to_path);
        const getAsync = promisify(db.get.bind(db));
        await getAsync('INSERT INTO invites (users_id, invite_id) VALUES (?, ?)', [user_id, invite_id]);
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

