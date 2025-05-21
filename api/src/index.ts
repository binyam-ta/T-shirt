import express, {json, urlencoded} from 'express';
import productsRouter from './routes/products/index.js';
import authRouter from './routes/auth/index.js';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(urlencoded({ extended: false }));
app.use(json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/products', productsRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});