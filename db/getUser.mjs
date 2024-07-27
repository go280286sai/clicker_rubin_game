import {promisify} from "util";
import {getDb} from "./func/getDb.mjs";
import {getData} from "./func/getData.mjs";
import {config} from "./func/config.mjs";

export async function getUser(index, name, to_path = config.work_database) {
    let db;
    try {
        const formattedDate = getData();
        db = getDb(to_path);

        // Промисифицируем методы run и get
        const runAsync = promisify(db.run.bind(db));
        const getAsync = promisify(db.get.bind(db));

        await runAsync("CREATE TABLE IF NOT EXISTS users (" +
            "id TEXT PRIMARY KEY, name TEXT, create_at TEXT, status INTEGER DEFAULT 1, " +
            "amount INTEGER DEFAULT 0, wallet TEXT DEFAULT null, farming DATETIME DEFAULT null )");

        await runAsync("CREATE TABLE IF NOT EXISTS invites (" +
            "users_id INTEGER, invite_id INTEGER," +
            "CONSTRAINT invites_users_FK FOREIGN KEY (users_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE)");

        await runAsync("CREATE TABLE IF NOT EXISTS tasks (" +
            "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "name TEXT, create_at TEXT, status INTEGER DEFAULT 1, amount INTEGER, url TEXT)");

        await runAsync("CREATE TABLE IF NOT EXISTS users_tasks (" +
            "users_id INTEGER, tasks_id INTEGER, " +
            "CONSTRAINT users_tasks_users_FK FOREIGN KEY (users_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE, " +
            "CONSTRAINT users_tasks_tasks_FK FOREIGN KEY (tasks_id) REFERENCES tasks(id) ON DELETE CASCADE ON UPDATE CASCADE)");

        let user = await getAsync(
            `SELECT users.*, GROUP_CONCAT(users_tasks.tasks_id) AS tasks_ids, GROUP_CONCAT(invites.invite_id) AS invite_ids
    FROM users
    LEFT JOIN users_tasks ON users.id = users_tasks.users_id
    LEFT JOIN invites ON users.id = invites.users_id
    WHERE users.id = ?
    GROUP BY users.id, users.name`, [index]
        );

        if (!user) {
            await runAsync("INSERT INTO users (id, name, create_at) " +
                "VALUES (?, ?, ?)", [index, name,  formattedDate]);
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
