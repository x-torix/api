//było korzystane z pomocy naukowych i mam nadzieje że ten cudowny projekt zadziała 😊//

const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/kursy', async (req, res) => {
  try {
    const response = await axios.get('https://api.nbp.pl/api/exchangerates/tables/A/');
    const kursy = response.data[0].rates;

    console.log('Kursy walut:');
    kursy.forEach(rate => {
      console.log(`${rate.currency}: ${rate.mid}`);
    });

    res.json(kursy);
  } catch (error) {
    console.error('Błąd podczas pobierania kursów:', error.message);
    res.status(500).json({ error: 'Błąd podczas pobierania kursów' });
  }
});

app.get('/dolar', async (req, res) => {
  try {
    const response = await axios.get('https://api.nbp.pl/api/exchangerates/rates/A/USD');
    const kursDolara = response.data.rates[0].mid;

    res.json({ kursDolara });
  } catch (error) {
    console.error('Błąd podczas pobierania kursu dolara:', error.message);
    res.status(500).json({ error: 'Błąd podczas pobierania kursu dolara' });
  }
});

app.get('/euro', async (req, res) => {
  try {
    const response = await axios.get('https://api.nbp.pl/api/exchangerates/rates/A/EUR');
    const kursEuro = response.data.rates[0].mid;

    res.json({ kursEuro });
  } catch (error) {
    console.error('Błąd podczas pobierania kursu euro:', error.message);
    res.status(500).json({ error: 'Błąd podczas pobierania kursu euro' });
  }
});

app.get('/funt', async (req, res) => {
  try {
    const response = await axios.get('https://api.nbp.pl/api/exchangerates/rates/A/GBP');
    const kursFunta = response.data.rates[0].mid;

    res.json({ kursFunta });
  } catch (error) {
    console.error('Błąd podczas pobierania kursu funta:', error.message);
    res.status(500).json({ error: 'Błąd podczas pobierania kursu funta' });
  }
});

app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});