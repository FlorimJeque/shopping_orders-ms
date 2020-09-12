import express from 'express';

const app = express();

app.get('/', (req, res) => {
  return res.send('Teste de typescript');
});

app.listen(3000);
