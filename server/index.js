const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json({limit: '10mb'}));

const DATA_FILE = path.join(__dirname, 'data', 'sheets.json');

function ensureDataFile(){
  const dir = path.dirname(DATA_FILE);
  if(!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if(!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify({}), 'utf8');
}

ensureDataFile();

app.get('/api/sheets', (req, res) => {
  try{
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    const json = JSON.parse(raw || '{}');
    res.json({ ok:true, data: json });
  }catch(e){ res.status(500).json({ ok:false, error: e.message }); }
});

app.post('/api/sheets', (req, res) => {
  try{
    const payload = req.body || {};
    fs.writeFileSync(DATA_FILE, JSON.stringify(payload, null, 2), 'utf8');
    res.json({ ok:true });
  }catch(e){ res.status(500).json({ ok:false, error: e.message }); }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log(`Gadoon admin server listening on http://localhost:${PORT}`));
