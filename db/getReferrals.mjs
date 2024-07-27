import { promisify } from "util";
import { getDb } from "./func/getDb.mjs";
import { getData } from "./func/getData.mjs";
import { config } from "./func/config.mjs";

export async function getReferrals(index,  to_path = config.work_database) {
    let db;
    try {
        db = getDb(to_path);
        const getAsync = promisify(db.get.bind(db));

        let user = await getAsync(
            `SELECT * users WHERE users.id = ?`, [index]
        );


        if (!user) {
            await runAsync("INSERT INTO users (id, name, create_at,  invite_id) " +
                "VALUES (?, ?, ?, ?)", [index, name, formattedDate, invite_id]);
            user = await getAsync("SELECT * FROM users WHERE id = ?", [index]);
        }

        return user;
    } catch (e) {
        console.error('Database error:', e);
        return [];
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
