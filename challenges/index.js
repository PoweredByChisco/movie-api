const express = require('express');
const app = express();
const port = 3000;

app.get('/', function (req, res) {
  res.send(
    'Please introduce the year in the url like this localhost:3000/2019'
  );
});

app.get('/:year', (req, res) => {
  const year = parseInt(req.params.year);
  if ((year % 4 === 0 && year & (100 !== 0)) || year % 400 === 0) {
    res.send('Is leap year');
  } else {
    res.send('Is not leap-year');
  }
});

app.listen(port, function () {
  console.log(`Listening http://localhost:${port} `);
});
