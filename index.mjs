import http from 'http';
import express from 'express';
import path from 'path';
import {getTasks} from './db/getTasks.mjs';
import csurf from 'csurf';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import session from 'express-session';
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import routeAdmin from "./routers/admin.mjs";
import routeUser from "./routers/user.mjs";

const app = express();
const server = http.createServer(app);

// Белый список разрешенных сайтов
const allowedOrigins = [
    'http://192.168.50.70:5000',
    process.env.URL_START,
];

const corsOptions = {
    origin: function (origin, callback) {
        // Разрешить запросы с белого списка
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true // Разрешить передачу cookie
};
app.use(session({
    secret: 'masterkey', // секретный ключ для подписи cookie сессии
    resave: false, // не сохранять сессию, если она не была изменена
    saveUninitialized: true, // сохранять пустую сессию
    cookie: {secure: false} // если true, то использовать только HTTPS
}));

app.use(cors(corsOptions));
app.use(bodyParser.json());
// Настройка парсинга cookies
app.use(cookieParser());

// Настройка CSRF защиты
const csrfProtection = csurf({cookie: true});

// Serve static files from the React app
app.use(express.static(path.resolve() + '/front/build'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(routeAdmin);
app.use(routeUser);
app.set('views', path.resolve() + '/front/build/admin');
app.set('view engine', 'pug');
// Обработка ошибок CSRF
app.use((err, req, res, next) => {
    if (err.code !== 'EBADCSRFTOKEN') return next(err);
    res.status(403).send('Invalid CSRF token');
});

// Запуск сервера
server.listen(5000, '192.168.50.70', () => {
    console.log('Listening on 192.168.50.70:5000');
});
