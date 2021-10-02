const express = require('express');
const productsRoute = require('./routes/products');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 8080;


app.use(express.json()); //body-parser(deprecated)
app.use(express.urlencoded({ extended: false }));

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use("/api", productsRoute);

app.listen(PORT, () => {
    console.log(`Server is run on port ${PORT}`);
}).on('error', err => console.log(err));
