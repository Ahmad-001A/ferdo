const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Разрешаем запросы с любых источников
app.use(cors());

// Парсим JSON и формы
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// POST маршрут
app.post('/submit', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Имя и пароль обязательны.' });
  }

  console.log('Получено:', username, password); // для проверки

  res.json({
    message: 'Данные успешно получены!',
    user: sanitize(username),
    pass: sanitize(password)
  });
});

// Защита от XSS
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
  console.log(`Сервер работает на порту ${port}`);
});
