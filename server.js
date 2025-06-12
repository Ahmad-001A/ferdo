const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Включаем CORS — разрешаем запросы с любого домена
app.use(cors());

// Встроенный парсер JSON и urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Папка для статики (если нужна)
app.use(express.static(path.join(__dirname, 'public')));

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

// POST маршрут
app.post('/submit', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Имя и пароль обязательны.');
  }

  res.send(`
    <html>
      <head>
        <title>Данные пользователя</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: #f0f4f8;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
          }
          .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 15px rgba(0,0,0,0.1);
            max-width: 400px;
            width: 100%;
            text-align: center;
          }
          h1 {
            color: #333;
            margin-bottom: 20px;
          }
          p {
            font-size: 18px;
            color: #555;
            margin: 10px 0;
            word-wrap: break-word;
          }
          .label {
            font-weight: bold;
            color: #222;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Информация о пользователе</h1>
          <p><span class="label">Имя пользователя:</span> ${sanitize(username)}</p>
          <p><span class="label">Пароль:</span> ${sanitize(password)}</p>
        </div>
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
