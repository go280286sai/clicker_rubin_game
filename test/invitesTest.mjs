import assert from 'assert';
import {getUser} from '../db/getUser.mjs';
import {rmUser} from "../db/rmUser.mjs";
import {cleanDb} from "../db/cleanDb.mjs";
import {config} from "../db/func/config.mjs";
import {settInvite} from "../db/settInvite.mjs";
import {getInvite} from "../db/getInvite.mjs";

describe('Invites', function () {
    describe('#indexOf()', function () {
        it('Get user new', async function () {
            const users1 = await getUser('1', 'user1', config.test_database);
            assert(users1['name'] === 'user1')
            const users2 = await getUser('2', 'user2', config.test_database);
            assert(users2['name'] === 'user2')
        });
        it('Get user', async function () {
            const users1 = await getUser('1', 'user1', config.test_database);
            assert(users1['name'] === 'user1')
            const users2 = await getUser('2', 'user2', config.test_database);
            assert(users2['name'] === 'user2')
        });
        it('Insert invite', async function () {
            const user1 = await getUser('1', 'user1', config.test_database);
            const user2 = await getUser('2', 'user2', config.test_database);
            const user3 = await getUser('3', 'user3', config.test_database);
            const id1 = user1['id'];
            const id2 = user2['id'];
            const id3 = user3['id'];
            await settInvite(id1, id2, config.test_database);
            await settInvite(id1, id3, config.test_database);
            const user = await getUser('1', 'user1', config.test_database);
            assert(user['invite_ids'].length > 1);
            const id = user['invite_ids'][0];
            const invite = await getInvite(id, config.test_database);
            assert(invite['amount'] === 0);
            assert(invite['name'] === 'user2');

        });
        it('Remove users', async function () {
            const users = await rmUser('1', config.test_database);
            assert(users === true);
        });
        it('Clean DB', async function () {
            const users = await cleanDb(config.test_database);
            assert(users === true);
        });
    });
});