const express = require('express');
const path = require('path');
const fs = require('fs');
const articles = require('./data/articles.json');



const articlesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'articles.json'), 'utf8'));
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'public', 'static')));


app.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname, 'public', 'integration', 'index.html'));
    res.render('index', { articles: articlesData });
});

app.get('/article/:id', (req, res)=>{
    const articleId = req.params.id;
    const article = articles.find(a => a.id == articleId);

    if (article) {
        res.render('article', { article });
    } else {
        res.status(404).send('error404',{ url: req.url });
    }

});

app.use((req, res, next)=> {
    res.status(404).render('error404', { url: req.url });
    next();

});


app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});