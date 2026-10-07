const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: (process.env.CLIENT_ORIGIN || "http://localhost:4200").split(",") }));
app.use(express.json());

const users = [];
let products = [];

// Temporary seed so the product shape matches the frontend model. Swap for a DB later.
async function loadProducts() {
  const res = await fetch('https://fakestoreapi.com/products', {
    headers: { 'User-Agent': 'Mozilla/5.0' },
  });
  products = await res.json();
  console.log(`Loaded ${products.length} products`);
}

const sign = (u) => jwt.sign({ id: u.id, email: u.email }, SECRET, { expiresIn: '2h' });
const publicUser = (u) => ({ id: u.id, name: u.name, email: u.email });

function auth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Missing token' });
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
  if (users.find((u) => u.email === email)) return res.status(409).json({ message: 'Email already registered' });
  const user = { id: users.length + 1, name: name || '', email, passwordHash: await bcrypt.hash(password, 10) };
  users.push(user);
  res.status(201).json({ token: sign(user), user: publicUser(user) });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user || !(await bcrypt.compare(password || '', user.passwordHash))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  res.json({ token: sign(user), user: publicUser(user) });
});

app.get('/api/me', auth, (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  res.json(publicUser(user));
});

app.get('/api/products', (req, res) => {
  const { search = '', category, limit } = req.query;
  const q = String(search).toLowerCase();
  let list = products.filter(
    (p) => (!category || category === 'All' || p.category === category) && p.title.toLowerCase().includes(q)
  );
  if (limit) list = list.slice(0, Number(limit));
  res.json(list);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

app.get("/api/categories", (req, res) => {
  res.json([...new Set(products.map((p) => p.category))]);
});

loadProducts()
  .then(() => app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`)))
  .catch((e) => console.error('Failed to seed products', e));
