import {promisify} from "util";
import {getDb} from "./func/getDb.mjs";
import {getData} from "./func/getData.mjs";
import {config} from "./func/config.mjs";

export async function getUsers(to_path = config.work_database) {
    let db;
    try {
        const formattedDate = getData();
        db = getDb(to_path);

        // Промисифицируем методы run и get
        const getAsync = promisify(db.all.bind(db));

        return await getAsync(
            `SELECT users.*, GROUP_CONCAT(users_tasks.tasks_id) AS tasks_ids, GROUP_CONCAT(DISTINCT invites.invite_id) AS invite_ids
    FROM users
    LEFT JOIN users_tasks ON users.id = users_tasks.users_id
    LEFT JOIN invites ON users.id = invites.users_id
    GROUP BY users.id, users.name`, []);
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
