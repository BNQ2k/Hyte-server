import express from 'express';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Tämä on Express-palvelin!');
});

app.listen(port, () => {
  console.log(`Express-palvelin pyörii osoitteessa http://localhost:${port}`);
});
