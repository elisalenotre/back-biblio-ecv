"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
let books = [
    { id: 1, title: 'Le Petit Prince', author: 'Antoine de Saint-Exupéry', status: 'available' },
    { id: 2, title: '1984', author: 'George Orwell', status: 'available' }
];
app.get('/books', (req, res) => {
    res.json(books);
});
app.post('/books', (req, res) => {
    const { title, author } = req.body;
    const newBook = { id: books.length + 1, title, author, status: 'available' };
    books.push(newBook);
    res.status(201).json(newBook);
});
app.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    books = books.filter(book => book.id !== parseInt(id));
    res.status(200).json({ message: 'Livre supprimé avec succès' });
});
app.patch('/books/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const book = books.find(book => book.id === parseInt(id));
    if (book) {
        book.status = status;
        res.status(200).json(book);
    }
    else {
        res.status(404).json({ message: 'Livre non trouvé' });
    }
});
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
