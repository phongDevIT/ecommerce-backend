const Product = require("../models/ProductModel");
const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, countInStock, price, rating, description } =
            newProduct;

        try {
            const checkProduct = await Product.findOne({
                name: name,
            });
            if (checkProduct !== null) {
                resolve({
                    status: "ERROR",
                    message: "The name product of is already .",
                });
            }
            const newProduct = await Product.create({
                name,
                image,
                type,
                countInStock,
                price,
                rating,
                description,
            });
            if (newProduct) {
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: newProduct,
                });
            }
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};
const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id,
            });
            if (checkProduct === null) {
                resolve({
                    status: "ERROR",
                    message: "The product is not defined.",
                });
            }
            const updatedProduct = await Product.findByIdAndUpdate(id, data, {
                new: true,
            });
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: updatedProduct,
            });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};

const getDetailProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id,
            });
            if (product === null) {
                resolve({
                    status: "ERROR",
                    message: "The product is not defined.",
                });
            }
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: product,
            });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};
const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id,
            });
            if (checkProduct === null) {
                resolve({
                    status: "ERROR",
                    message: "The check product is not defined.",
                });
            }
            await Product.findOneAndDelete(id);
            resolve({
                status: "OK",
                message: "DELETE PRODUCT SUCCESS",
            });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};
const getAllProduct = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allProduct = await Product.find();
            resolve({
                status: "OK",
                message: "ALL USER SUCCESS",
                data: allProduct,
            });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};
module.exports = {
    createProduct,
    updateProduct,
    getDetailProduct,
    deleteProduct,
    getAllProduct,
};
