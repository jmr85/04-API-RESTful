const fs = require('fs');

module.exports = class Contenedor {
    constructor(fileName) {
        this.fileName = fileName;
    }
    async save(title, price, thumbnail) {
        try {
            const data = await fs.promises.readFile(`./${this.fileName}`, 'utf8')
            const arrayProductos = JSON.parse(data);
            arrayProductos.push({
                id: arrayProductos.length + 1,
                title: title,
                price: price,
                thumbnail: thumbnail
            });
            await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(arrayProductos, null, '\t'));

        } catch (error) {
            throw error;
        }
    }
    async getAll() {
        let contenido = []
        try {
            contenido = await fs.promises.readFile(`./${this.fileName}`, 'utf8')
            //console.log(contenido);
        } catch (error) {
            console.error(error);
            //throw error
        }
        return contenido;
    }

    async getById(id) {
        let contenido = [];
        let found = {};
        try {
            contenido = await fs.promises.readFile(`./${this.fileName}`, 'utf8')
            const contendoID = JSON.parse(contenido);
            found = contendoID.find(element => element.id === Number(id));
        } catch (error) {
            console.log(error);
            throw error
        }
        if (found !== null) {
            contenido = found;
        } else {
            contenido = null;
        }
        return contenido;
    }

    async update(id, params) {
        let contenido = [];
        const { title, price, thumbnail } = params;
        try {
            const data = await fs.promises.readFile(`./${this.fileName}`, 'utf8')
            contenido = JSON.parse(data);
            console.log("params desde Contenedor.update: ", params);
            console.log("params.title desde Contenedor.update: ", title);
            let objIndex = contenido.findIndex((obj => obj.id === Number(id)));
            contenido[objIndex].title = title;
            contenido[objIndex].price = price;
            contenido[objIndex].thumbnail = thumbnail;
            await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(contenido, null, '\t'));
        } catch (error) {
            throw error;
        }
        return contenido;
    }

    async deleteAll() {
        try {
            await fs.promises.unlink(`./${this.fileName}`, 'utf8')
        } catch (error) {
            throw error;
        }
    }

    async deleteById(id) {
        // let contenido = []
        // try {
        //     contenido = await fs.promises.readFile(`./${this.fileName}`, 'utf8')
        //     const contendoID = JSON.parse(contenido);
        //     const found = contendoID.find(element => element.id === id);
        //     console.log(found);
        //     const arrayProductos = JSON.parse(found);
        //     arrayProductos.push({
        //         id: arrayProductos.length + 1,
        //         title: title,
        //         price: price,
        //         thumbnail: thumbnail
        //     });
        //     await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(arrayProductos, null, '\t'));
        // } catch (error) {
        //     console.log(error);
        //     throw error
        // }


        let contenido = [];
        //let found = {};
        try {
            contenido = await fs.promises.readFile(`./${this.fileName}`, 'utf-8')
            //const contendoID = JSON.parse(contenido);
            contenido = contenido.find(element => element.id === id);
            delete contenido.id;
        } catch (error) {
            console.log(error);
            throw error
        }

        try {
            await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(result, null, 2));
            return console.log(`se ha borrado producto con id: ${id}`);
        } catch (error) {
            console.log(error);
            throw error
        }


    }

}