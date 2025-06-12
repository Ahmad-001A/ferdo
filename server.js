const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// CORS для любых источников
app.use(cors());

// Разбираем тело запроса
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('Ошибка: имя и пароль обязательны.');
  }

  res.send(`
    <html>
      <head><title>Данные</title></head>
      <body style="font-family:sans-serif;text-align:center;padding:40px;">
        <h1>Информация получена!</h1>
        <p><strong>Имя:</strong> ${sanitize(username)}</p>
        <p><strong>Пароль:</strong> ${sanitize(password)}</p>
      </body>
    </html>
  `);
});

function sanitize(str) {
  return String(str).replace(/[&<>"']/g, (m) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[m]));
}

app.listen(port, () => {
  console.log(`Сервер на порту ${port}`);
});
