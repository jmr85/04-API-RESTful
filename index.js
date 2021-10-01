const express = require('express');


const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json()); //body-parser(deprecated)


const productsRoute = require('./routes/products');

app.use("/api", productsRoute);

app.listen(PORT, () => {
    console.log(`Server is run on port ${PORT}`);
}).on('error', err => console.log(err));
