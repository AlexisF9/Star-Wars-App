import express from 'express';
import searchRoute from './routes/search.route';
import categoryRoute from './routes/category.route';
import authRoute from './routes/auth.route';
import cors from 'cors';

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// seulement le front React local est autorisé à accèder à l'API
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

app.use('/api/search', searchRoute);
app.use('/api/category', categoryRoute);
app.use('/api/auth', authRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});