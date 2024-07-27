import assert from 'assert';
import {getTasks} from '../db/getTasks.mjs';
import {insertTasks} from "../db/insertTasks.mjs";
import {cleanTasks} from "../db/cleanTasks.mjs";
import {setStatusTask} from "../db/setStatusTask.mjs";
import {rmTask} from "../db/rmTask.mjs";
import {config} from "../db/func/config.mjs";

describe('Tasks', () => {
    it('Get tasks', async () => {
        let tasks = await getTasks(config.test_database);
        assert(tasks.length === 0);
    });
    it('Insert tasks', async () => {
        let tasks = await getTasks(config.test_database);
        assert(tasks.length === 0);
        await insertTasks('Some text', 100, "url", config.test_database);
        tasks = await getTasks(config.test_database);
        assert(tasks[0]['amount'] === 100);
    });
    it('Set status', async () => {
        let task = await getTasks(config.test_database);
        assert(task[0]['status'] === 1);
        let id = task[0]['id'];
        await setStatusTask(id, 0, config.test_database);
        task = await getTasks(config.test_database);
        assert(task[0]['status'] === 0);
    });
    it('Remove tasks', async () => {
        let task = await getTasks(config.test_database);
        assert(task.length === 1);
        let id = task[0]['id'];
        await rmTask(id, config.test_database);
        task = await getTasks(config.test_database);
        assert(task.length === 0);
    });
    it('Clean tasks', async () => {
        let tasks = await cleanTasks(config.test_database);
        assert(tasks === true);
    });
})