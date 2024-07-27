import { promisify } from "util";
import { getDb } from "./func/getDb.mjs";
import { config } from "./func/config.mjs";

export async function mintUser(index, amount,  to_path = config.work_database) {
    let db;
    try {
        db = getDb(to_path);
        const getAsync = promisify(db.get.bind(db));
        let user = await getAsync(
            `UPDATE users SET amount = ? WHERE id = ?`, [amount, index]
        );
        return true;
    } catch (e) {
        console.error('Database error:', e);
        return false;
    } finally {
        if (db) {
            db.close((err) => {
                if (err) {
                    console.error('Error closing database:', err);
                }
            });
        }
    }
}
