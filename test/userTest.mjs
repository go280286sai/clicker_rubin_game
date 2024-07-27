import assert from 'assert';
import {getUser} from '../db/getUser.mjs';
import {rmUser} from "../db/rmUser.mjs";
import {cleanDb} from "../db/cleanDb.mjs";
import {setStatusUser} from "../db/setStatusUser.mjs";
import {config} from "../db/func/config.mjs";
import {mintUser} from "../db/mintUser.mjs";
import {isUser} from "../db/isUser.mjs";
import {addWallet} from "../db/addWallet.mjs";
import {getUsers} from "../db/getUsers.mjs";

describe('Users', function () {
    describe('#indexOf()', function () {
        it('Get user new', async function () {
            const users = await getUser('1', 'alex', config.test_database);
            assert(users['name'] === 'alex');
        });
        it('Get user', async function () {
            const users = await getUser('1', 'alex', config.test_database);
            assert(users['name'] === 'alex');
        });
        it('Get users', async function () {
           await getUser('2', 'sergey', config.test_database);
            const users = await getUsers(config.test_database);
            console.log(users);
            assert(users.length > 1);
        });
        it('Is user', async function (){
            const user1 = await isUser('1', config.test_database);
            assert(user1===true);
            const user2 = await isUser('3', config.test_database);
            assert(user2===false);
        });
        it('Set status', async function () {
            let user = await getUser('1', 'alex', config.test_database);
            assert(user['status'] === 1);
            await setStatusUser('1', 0, config.test_database);
            user = await getUser('1', 'alex', config.test_database);
            assert(user['status'] === 0);
        });
        it("User set amount", async function () {
            let user = await getUser('1', 'alex', config.test_database);
            assert(user['amount'] === 0);
            await mintUser(user['id'], 100, config.test_database);
            user = await getUser('1', 'alex', config.test_database);
            assert(user['amount'] === 100);
        });
        it('Add wallet', async function () {
           let user = await getUser('1', 'alex', config.test_database);
           assert(user['wallet'] === null);
           await addWallet(user['id'], "0x0000000000000000000000000000000000000000", config.test_database);
           user = await getUser('1', 'alex', config.test_database);
           assert(user['wallet'] === "0x0000000000000000000000000000000000000000");
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