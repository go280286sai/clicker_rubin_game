import express from 'express';
import path from 'path';
import {getUser} from "../db/getUser.mjs";
import {mintUser} from "../db/mintUser.mjs";
import {insertUsersTasks} from "../db/insertUsersTasks.mjs";
import {settInvite} from "../db/settInvite.mjs";
import {isUser} from "../db/isUser.mjs";
import {getInvite} from "../db/getInvite.mjs";
import {addWallet} from "../db/addWallet.mjs";
const routeUser = express.Router();

routeUser.get('/:ids/:names/:referral?', async (req, res) => {
    const id = req.params['ids'].toString();
    const names = req.params['names'].toString();
    const referral = req.params['referral'].toString();
    try {
        req.session.ids = id;
        req.session.names = names;
        req.session.referral = referral;
        const is_user = await isUser(id);
        await getUser(id, names);
        if (!is_user && referral !== null) {
            const bonus = 200;
            await settInvite(referral, id)
            const user = await getInvite(referral);
            await mintUser(referral, user['amount']+bonus);
            await mintUser(id, bonus);
        }
        res.redirect('/main');
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

routeUser.get('/main', async (req, res) => {
    res.sendFile(path.resolve() + '/front/build/index.html');
})

routeUser.get('/user', async (req, res) => {
    const id = req.session.ids;
    const names= req.session.names;
    const user = await getUser(id, names);
    // const user = await getUser("5", "alex");
    res.json(user);
});

// Маршрут для получения задач с проверкой белого списка и CSRF защиты
routeUser.get('/tasks', async (req, res) => {
    const tasks = await getTasks();
    res.json(tasks);
});
routeUser.post('/api/mint', async (req, res) => {
    try {
        const id = req.session.ids;
        // const id = 5;
        const amount = req.body.amount;
        await mintUser(id, amount);
        res.send({'status': 'ok'});
    } catch (e) {
        console.log(e.message);
        res.send({'status': 'error'});
    }

})
routeUser.post('/api/add_wallet', async (req, res) => {
    const wallet = req.body.wallet;
    const id = req.session.ids;
    // const id = 5;
    await addWallet(id, wallet);
    res.send({'status': 'ok'});
});
routeUser.post('/api/insert_invite', async (req, res) => {
    try {
        let invite_ids = req.body.invite_ids;
        invite_ids = invite_ids.toString().trim().split(',');
        let users = [];
        for (let invite_id of invite_ids) {
            if (invite_id === '') continue;
            else users.push(await getInvite(invite_id));
        }
        res.json(users);
    } catch (e) {
        console.log(e.message);
        res.send({'status': 'error'});
    }
})
routeUser.post('/api/insert_users_tasks', async (req, res) => {
    try {
        // const user_id = req.session.ids;
        const user_id = 5;
        const task_id = req.body.task_id;
        await insertUsersTasks(user_id, task_id);
        res.send({'status': 'ok'});
    } catch (e) {
        console.log(e.message);
        res.send({'status': 'error'});
    }
})
export default routeUser;