import assert from 'assert';
import {insertUsersTasks} from "../db/insertUsersTasks.mjs";
import {config} from "../db/func/config.mjs";
import {getUser} from "../db/getUser.mjs";
import {rmUser} from "../db/rmUser.mjs";

describe('Users', function () {
    describe('#indexOf()', function () {
        it('Insert to users_tasks', async function () {
            let user = await getUser(1, 'alex',  config.test_database);
            const id = user['id'];
            await insertUsersTasks(id, 1, config.test_database);
            user = await getUser(1, 'alex', config.test_database);
            assert(user['tasks_ids'].length>1);
            await rmUser(id, config.test_database);
        });
    });
});