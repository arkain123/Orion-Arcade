const { Telegraf, Markup, session } = require('telegraf');

// Уровни разговора
const GENDER = 0;
const NAME = 1;
const PREFERENCES = 2;

//руглярное выражения всех видов строк
const regexAllMes = /(.+)/;

// Словарь, хранящий информацию о пользователях
const users = [];

// Создайте экземпляр бота
const bot = new Telegraf('6659929844:AAHimT0xVaQKovHtSIXhNQmj5cCNg9F-YcM');
bot.use(session());

// Обработчик команды /start
bot.command('start', (ctx) => {
    const chatId = ctx.chat.id;
    ctx.session = ctx.session || {};
    ctx.session.state = GENDER;

    const replyKeyboard = Markup.keyboard(['Мужской', 'Женский']).oneTime().resize();
    ctx.reply('Привет! Я бот знакомств. Давай начнем с твоего пола.', replyKeyboard);
});

// Обработчик выбора пола
bot.hears(['Мужской', 'Женский'], (ctx) => {
    ctx.session = ctx.session || {};
    ctx.session.gender = ctx.message.text;
    ctx.reply('Отлично! Теперь введи свое имя.');
    ctx.session.state = NAME;
});

// Обработчик ввода имени
bot.hears(regexAllMes, (ctx) => {
    const text = ctx.message.text;
    ctx.session = ctx.session || {};

    console.log(ctx.session.state);

    if (ctx.session.state === NAME) {
        ctx.session.name = text;
        ctx.session.state = PREFERENCES;

        const replyKeyboard = Markup.keyboard(['Практика коммуникации', 'Найти отношения', 'Найти секс']).oneTime().resize();
        ctx.reply('Выбери свои предпочтения (можно выбрать несколько):', replyKeyboard);
    }
});

// Обработчик выбора предпочтений
bot.hears(regexAllMes, (ctx) => {
    const text = ctx.message.text;
    ctx.session = ctx.session || {};
    if (ctx.session.state === PREFERENCES) {
        const preferences = text.split(' ');
        ctx.session.preferences = preferences;

        // Записываем пользователя в массив users
        const userData = {
            name: ctx.session.name,
            gender: ctx.session.gender,
            preferences: ctx.session.preferences,
        };
        users.push(userData);

        ctx.reply('Список собеседников, удовлетворяющих вашим запросам:');
        showUsers(ctx);

        // Завершаем беседу
        ctx.session = {};
    }
});

// Обработчик команды /cancel
bot.command('cancel', (ctx) => {
    ctx.reply('Отмена.');
    ctx.session = {};
});

// Вывод списка пользователей
function showUsers(ctx) {
    ctx.session = ctx.session || {};
    const preferences = ctx.session.preferences;
    const gender = ctx.session.gender;
    for (const user of users) {
        if (preferences.every(preference => user.preferences.includes(preference)) && user.gender === gender) {
            ctx.reply(`Имя: ${user.name}, Пол: ${user.gender}, Предпочтения: ${user.preferences.join(', ')}`);
        }
    }
}

// Запуск бота
bot.launch();
