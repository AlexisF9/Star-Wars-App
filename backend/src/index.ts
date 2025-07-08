import express from 'express';
import searchRoute from './routes/search.route';
import categoryRoute from './routes/category.route';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/search', searchRoute);
app.use('/api/category', categoryRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});