import express from 'express';
import crypto from 'crypto';
import path from 'path';
import dotenv from "dotenv";
import {getUsers} from "../db/getUsers.mjs";
import {rmUser} from "../db/rmUser.mjs";
import {setStatusUser} from "../db/setStatusUser.mjs";
import {getTasks} from "../db/getTasks.mjs";
import {insertTasks} from "../db/insertTasks.mjs";
import {setStatusTask} from "../db/setStatusTask.mjs";
import {rmTask} from "../db/rmTask.mjs";
dotenv.config();
const routeAdmin = express.Router();

routeAdmin.get('/admin/login', (req, res) => {
    res.render('login', {message: ""});
});

routeAdmin.post('/admin/auth', (req, res) => {
    const email = req.body['email'];
    const password = crypto.createHash('md5').update(req.body.password).digest('hex');
    if (email === process.env.ADMIN_EMAIL && password === crypto.createHash('md5').update(process.env.ADMIN_PASSWORD).digest('hex')) {
        req.session.auth = true;
        res.redirect('/admin/dashboard');
    } else {
        res.render('login', {message: "Неправильные данные"});
    }
});

routeAdmin.get('/admin/dashboard', (req, res) => {
    if (req.session.auth) {
        res.render('dashboard');
    } else {
        res.render('login', {message: "Необходима авторизация"});
    }
});

routeAdmin.get('/admin/logout', (req, res) => {
    if (req.session.auth) {
        req.session.destroy();
    }
    res.redirect('/admin/login');
})

routeAdmin.get('/admin/users', async (req, res) => {
    if (req.session.auth) {
        const users = await getUsers();
        res.render('users', {users: users});
    } else {
        res.render('login', {message: "Необходима авторизация"});
    }
})
routeAdmin.post('/admin/user_del', async (req, res) => {
    try{
        const id = req.body.id;
        await rmUser(id);
        res.redirect('/admin/users');
    } catch (e) {
        console.log(e.message);
        res.redirect('/admin/users');
    }
})
routeAdmin.post('/admin/user_block', async (req, res) => {
    const id = req.body.id;
    const status = req.body.status;
    await setStatusUser(id, status);
    res.redirect('/admin/users');
})

routeAdmin.get('/admin/tasks', async (req, res) => {
    if (req.session.auth) {
        const tasks = await getTasks();
        res.render('tasks', {tasks: tasks});
    } else {
        res.redirect('/admin/login');
    }
})
routeAdmin.post('/admin/task_del', async (req, res) => {
    try{
        const id = req.body.id;
        await rmTask(id);
        res.redirect('/admin/tasks');
    } catch (e) {
        console.log(e.message);
        res.redirect('/admin/tasks');
    }
})
routeAdmin.post('/admin/task_block', async (req, res) => {
    const id = req.body.id;
    const status = req.body.status;
    await setStatusTask(id, status);
    res.redirect('/admin/tasks');
})
routeAdmin.get('/admin/task_add', async (req, res) => {
    if (req.session.auth) {
        res.render('addTask');
    } else {
        res.redirect('/admin/login');
    }
})
routeAdmin.post('/admin/task_added', async (req, res) => {
    const title = req.body.title;
    const amount = req.body.amount;
    const url = req.body.url;
    await insertTasks(title, amount, url);
    res.redirect('/admin/tasks');
})
export default routeAdmin;
