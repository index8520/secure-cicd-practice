const express = require('express');
const os = require('os');
const app = express();
app.use(express.json());
app.get('/healthz', (req, res) => res.json({ status: 'ok', host: os.hostname() }));
app.get('/', (req, res) => res.json({ message: 'Hello from Secure CI/CD practice' }));
app.post('/echo', (req, res) => {
  const { text } = req.body;
  if (typeof text !== 'string' || text.length > 500) {
    return res.status(400).json({ error: 'Invalid input' });
  }
  res.json({ echoed: text });
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on ${port}`));
