import express from 'express';
import { engine } from 'express-handlebars';

const app = express();

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Set up Handlebars view engine
app.engine('hbs', engine());
app.set('view engine', 'hbs');
app.set('views', './views');

app.engine('hbs', engine({
    extname: 'hbs',
}));

app.get('/', function rootHandler(req, res) {
    res.render('home');
});

app.get('/login', function rootHandler(req, res) {
    res.render('login');
});

app.get('/register', function rootHandler(req, res) {
    res.render('register');
});

app.get('/writer', function rootHandler(req, res) {
    res.render('writer');
});

app.get('/editor', function rootHandler(req, res) {
    res.render('editor');
});

app.get('/administrator', function rootHandler(req, res) {
    res.render('administrator');
});
app.listen(3000, function() {
    console.log('Server started on http://localhost:3000');
});
