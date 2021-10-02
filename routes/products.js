const express = require("express");
const ContenedorClass = require("../Contenedor");
let contenedor = new ContenedorClass('./data/products.txt');

const { Router } = express;
const router = new Router();

// GET all
router.get('/products', async (req, res) => {
    let contenido;
    try {
        contenido = await contenedor.getAll();
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: "Error al devolver los productos !!!",
        });
    }
    return res.status(200).send(contenido);
});

// GET byId
router.get('/products/:id', async (req, res) => {
    let contenido;
    let prodId = req.params.id;
    console.log(prodId);
    try {
        contenido = await contenedor.getById(prodId);
        if (!contenido || contenido.id === null) {
            res.status(404).send({
                status: "error",
                message: "No existe el producto !!!",
            });
        }
        console.log(contenido);
        res.status(200).send(contenido);
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: "Product no encontrado !!!",
        });
    }


});

// POST save
router.post('/products', async (req, res) => {
    const { title, price, thumbnail } = req.body;
    try {
        await contenedor.save(title, price, thumbnail);
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: "Error al guardar productos !!!",
        });
    }
    return res.status(200).send("se ha guardado product");
});

// PUT actualiza product
router.put('/products/:id', async (req, res) => {
    let contenido;
    let prodId = req.params.id;
    let params = req.body;
    console.log("metodo put prodId: ", prodId);
    console.log("metodo put params: ", params);
    try {
        contenido = await contenedor.update(prodId, params);
        if (!contenido || contenido.id === null) {
            res.status(404).send({
                status: "error",
                message: "No existe el producto !!!",
            });
        }
        console.log(contenido);
        res.status(200).send({
            status: "ok",
            message: "Product actualizado !!!",
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: "Product no encontrado !!!",
        });
    }
});

// DELETE
router.delete('/products/:id', async (req, res) => {
    let prodId = req.params.id;
    try {
        await contenedor.deleteById(prodId);
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: "Error al borrar product !!!",
        });
    }
    console.log(prodId);
    return res.status(200).send(`se ha borrado producto con id: ${prodId}`);
});

module.exports = router;