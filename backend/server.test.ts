import request from 'supertest';
import express from 'express';
import { Book } from './book';
import morgan from 'morgan';
import cors from 'cors';

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

let books: Book[] = [
  { id: 1, title: '1984', author: 'George Orwell', available: true },
  { id: 2, title: 'Le Petit Prince', author: 'Antoine de Saint-Exupéry', available: true },
  { id: 3, title: 'Harry Potter à l\'école des sorciers', author: 'J.K. Rowling', available: false },
];

app.get('/api/books', (req, res) => {
  res.json(books);
});

app.post('/api/books', (req, res) => {
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

app.delete('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  books = books.filter(book => book.id !== bookId);
  res.status(204).end();
});

// // Tests
// describe('API Books', () => {
//   it('should get a list of books', async () => {
//     const response = await request(app).get('/api/books'); ;
//     expect(response.status).toBe(200);
//     expect(response.body.length).toBe(3);
//   });

//   it('should add a new book', async () => {
//     const newBook = { title: 'Le Hobbit', author: 'J.R.R. Tolkien' };
//     const response = await request(app).post('/api/books').send(newBook);
//     expect(response.status).toBe(201);
//     expect(response.body.title).toBe(newBook.title);
//     expect(response.body.author).toBe(newBook.author);
//     expect(response.body.available).toBe(true);
//   });

//   it('should delete a book', async () => {
//     const bookToDelete = books[0];
//     const response = await request(app).delete(`/api/books/${bookToDelete.id}`);
//     expect(response.status).toBe(204);

//     const getResponse = await request(app).get('/api/books');
//     expect(getResponse.body.length).toBe(2);
//   });
// });
