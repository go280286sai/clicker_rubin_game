import {promisify} from "util";
import {getDb} from "./func/getDb.mjs";
import {config} from "./func/config.mjs";


export async function cleanDb(to_path = config.work_database) {
    let db;
    try {
        db = getDb(to_path);
        const getAsync = promisify(db.run.bind(db));
        await getAsync('DELETE FROM users;');
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

