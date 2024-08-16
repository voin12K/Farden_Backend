import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(5000, (err) => { 
    if (err) {
        return console.log(err);
    }
    console.log('%cServer running on http://localhost:5000', 'color: green'); 
});
Кассель (KSF)