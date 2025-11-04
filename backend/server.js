require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend conectado correctamente' });
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === 'admin@iglesia.com' && password === 'admin123') {
      const token = jwt.sign(
        { userId: 1, email: email },
        process.env.JWT_SECRET || 'fallback-secret',
        { expiresIn: '24h' }
      );

      res.json({
        success: true,
        token: token,
        user: { id: 1, email: email, nombre: 'Administrador' }
      });
    } else {
      res.status(401).json({ success: false, error: 'Credenciales inválidas' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error interno del servidor' });
  }
});

app.get('/api/personas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM personas ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo personas' });
  }
});

app.get('/', (req, res) => {
  res.json({
    message: 'Backend Sistema Iglesia - Funcionando',
    version: '2.0.0'
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('🚀 Servidor ejecutándose en puerto ' + PORT);
});require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend conectado correctamente' });
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === 'admin@iglesia.com' && password === 'admin123') {
      const token = jwt.sign(
        { userId: 1, email: email },
        process.env.JWT_SECRET || 'fallback-secret',
        { expiresIn: '24h' }
      );

      res.json({
        success: true,
        token: token,
        user: { id: 1, email: email, nombre: 'Administrador' }
      });
    } else {
      res.status(401).json({ success: false, error: 'Credenciales inválidas' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error interno del servidor' });
  }
});

app.get('/api/personas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM personas ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo personas' });
  }
});

app.get('/', (req, res) => {
  res.json({
    message: 'Backend Sistema Iglesia - Funcionando',
    version: '2.0.0'
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('🚀 Servidor ejecutándose en puerto ' + PORT);
});
