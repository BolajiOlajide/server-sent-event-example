const express = require('express');

const app = express();

app.get('/', (req, res) => {
  return res.send('Hello! From some side');
});

app.get('/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');

  // the protocol dictates that each stream has to start with 'data: ' and end with
  // two newlines '\n\n'
  res.write('data: ' + 'hello\n\n');
  send(res);
});

let i = 0;
function send(res) {
  res.write('data: ' + `${i++} -- hello\n\n`);

  setTimeout(() => send(res), 1000);
}

app.listen(8080);
console.log('Listening on port 8080');
