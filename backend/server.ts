import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { Book } from './book';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

let books: Book[] = [
  { id: 1, title: '1984', author: 'George Orwell', available: true },
  { id: 2, title: 'Le Petit Prince', author: 'Antoine de Saint-Exupéry', available: true },
  { id: 3, title: 'Harry Potter à l\'école des sorciers', author: 'J.K. Rowling', available: false },
];

app.get('/api/books', (req: Request, res: Response) => {
  res.json(books);
});

app.post('/api/books', (req: Request, res: Response) => {
  const { title, author } = req.body;
  const newBook: Book = {
    id: books.length + 1,
    title,
    author,
    available: true,
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.delete('/api/books/:id', (req: Request, res: Response) => {
  const bookId = parseInt(req.params.id);
  books = books.filter(book => book.id !== bookId);
  res.status(204).end();
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
