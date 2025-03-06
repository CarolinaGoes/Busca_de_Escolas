const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '', // Add your MySQL root password here
  database: 'escolas',
  port: 3306
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

function fetchAddresses(callback) {
  const query = 'SELECT endereco FROM escolas';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching addresses:', err);
      callback(err, null);
      return;
    }
    const addresses = results.map(row => row.endereco);
    callback(null, addresses);
  });
}

module.exports = { fetchAddresses };
