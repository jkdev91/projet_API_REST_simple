// Importation avec ES6
import express from 'express';

// Création de l'application Express
const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Notre "base de données" simple (pour commencer)
let books = [
    {
        id: 1,
        title: "Le Petit Prince",
        author: "Antoine de Saint-Exupéry",
        year: 1943
    }
];

// Routes avec fonction fléchée (arrow functions ES6)
// Route pour obtenir tous les livres (GET)
app.get('/api/books', (req, res) => {
    res.json(books);
});

// Route pour obtenir un livre spécifique (GET)
app.get('/api/books/:id', (req, res) => {
    const book = books.find(book => book.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: "Livre non trouvé" });
    res.json(book);
});

// Route pour ajouter un nouveau livre (POST)
app.post('/api/books', (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author,
        year: req.body.year
    };
    
    books.push(newBook);
    res.status(201).json(newBook);
});

// Route pour modifier un livre (PUT)
app.put('/api/books/:id', (req, res) => {
    const book = books.find(book => book.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: "Livre non trouvé" });
    
    book.title = req.body.title ?? book.title;       // Utilisation de l'opérateur nullish coalescing ES6
    book.author = req.body.author ?? book.author;
    book.year = req.body.year ?? book.year;
    
    res.json(book);
});

// Route pour supprimer un livre (DELETE)
app.delete('/api/books/:id', (req, res) => {
    const bookIndex = books.findIndex(book => book.id === parseInt(req.params.id));
    if (bookIndex === -1) return res.status(404).json({ message: "Livre non trouvé" });
    
    books.splice(bookIndex, 1);
    res.status(200).json({ message: "Livre supprimé avec succès" });
});

// Démarrage du serveur avec template literal ES6
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});