const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'school_routes'
});

app.post('/getRoutes', (req, res) => {
  const { endereco, filtros } = req.body;
  const query = 'SELECT endereco FROM escolas LIMIT 1';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) {
      return res.status(404).json({ error: 'No addresses found in the database' });
    }
    const firstAddress = results[0].endereco;
    let filteredRoutes = [];
    if (filtros && filtros.length > 0) {
      filteredRoutes = results.filter(route => filtros.includes(route.someFilterField));
    } else {
      filteredRoutes = results;
    }
    const route = {
      from: endereco,
      to: firstAddress,
      distance: Math.random() * 10,
      time: Math.random() * 30
    };
    res.json({ route, filteredRoutes });
  });
});

app.get('/getAddresses', (req, res) => {
  const query = 'SELECT endereco FROM escolas';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    const addresses = results.map(row => row.endereco);
    res.json(addresses);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
