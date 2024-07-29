## Игра Clicker Rubin для Telegram

### Описание: Игра таполка для Telegram

### База данных

![](./img/0.png)

### Запуск через бота

````
bot.start((ctx) => {
const referral = ctx.payload.length>1?ctx.payload:null;
const id = ctx.from.id.toString();
const get_names = ctx.from.first_name;
const names = get_names.length>1?get_names:"";
ctx.reply(
`Привет, ${ctx.message.from.first_name}! Нажми на кнопку ниже, чтобы начать игру.`,
Markup.inlineKeyboard([
[Markup.button.webApp('Играть', LOCAL_WEB_APP_URL+`/${id}/${get_names}/${referral}`)],
])
);
});
````

## 1. Главная страница
![](./img/1.png)

## 2. Список задач
![](./img/2.png)

## 3. Реферальная ссылка и список приведенных
![](./img/5.png)
![](./img/6.png)

## 4. Вознагрождение
![](./img/3.png)
![](./img/4.png)

## Запуск:
1. 'bot/.env'
````
   BOT_TOKEN=___________________________________________________
   LOCAL_WEB_APP_URL=___________________________________________
````
Указать имя бота и адрес сервера
2. '.env'
````
   ADMIN_EMAIL=admin@admin.ua
   ADMIN_PASSWORD=12345678
   URL_START=____________________________________________________
````
email и password для входа в админ панель
3. 'front/src/config.mjs'
````
   export const config = {
   PATH_URL : '_________________________________________________',
   APP_URL :  '_________________________________________________'
   }
````
````
npm run build
````

### Admin 
http://localhost:5000/admin/login
![](./img/7.png)

http://localhost:5000/admin/users
![](./img/8.png)

http://localhost:5000/admin/tasks
![](./img/9.png)
![](./img/10.png)