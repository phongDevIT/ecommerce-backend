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
// const getAllProduct = (limit, page, sort, filter) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const label = filter[0];
//             const totalProduct = await Product.count();
//             if (filter) {
//                 const allObjectFilter = await Product.find({
//                     [label]: { $regex: filter[1] },
//                 })
//                     .limit(limit)
//                     .skip(page * limit);

//                 resolve({
//                     status: "OK",
//                     message: "ALL USER SUCCESS",
//                     data: allObjectFilter,
//                     total: totalProduct,
//                     pageCurrent: Number(page + 1),
//                     totalPage: Math.ceil(totalProduct / limit),
//                 });
//             }
//             if (sort) {
//                 const objectSort = {};
//                 objectSort[sort[1]] = sort[0];
//                 const allProductSort = await Product.find()
//                     .limit(limit)
//                     .skip(page * limit)
//                     .sort(objectSort);
//                 resolve({
//                     status: "OK",
//                     message: "ALL USER SUCCESS",
//                     data: allProductSort,
//                     total: totalProduct,
//                     pageCurrent: Number(page + 1),
//                     totalPage: Math.ceil(totalProduct / limit),
//                 });
//             }
//             const allProduct = await Product.find()
//                 .limit(limit)
//                 .skip(page * limit)
//                 .sort({
//                     name: sort,
//                 });
//             resolve({
//                 status: "OK",
//                 message: "ALL USER SUCCESS",
//                 data: allProduct,
//                 total: totalProduct,
//                 pageCurrent: Number(page + 1),
//                 totalPage: Math.ceil(totalProduct / limit),
//             });
//         } catch (error) {
//             console.log(error);
//             reject(error);
//         }
//     });
// };
const getAllProduct = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.count();

            if (filter && filter.length >= 2) {
                const label = filter[0];
                const allObjectFilter = await Product.find({
                    [label]: { $regex: filter[1] },
                })
                    .limit(limit)
                    .skip(page * limit);

                resolve({
                    status: "OK",
                    message: "ALL USER SUCCESS",
                    data: allObjectFilter,
                    total: totalProduct,
                    pageCurrent: Number(page) + 1,
                    totalPage: Math.ceil(totalProduct / limit),
                });
            }

            if (sort && sort.length >= 2) {
                const objectSort = {};
                objectSort[sort[1]] = sort[0];
                const allProductSort = await Product.find()
                    .limit(limit)
                    .skip(page * limit)
                    .sort(objectSort);

                resolve({
                    status: "OK",
                    message: "ALL USER SUCCESS",
                    data: allProductSort,
                    total: totalProduct,
                    pageCurrent: Number(page) + 1,
                    totalPage: Math.ceil(totalProduct / limit),
                });
            }

            const allProduct = await Product.find()
                .limit(limit)
                .skip(page * limit)
                .sort({ name: sort });

            resolve({
                status: "OK",
                message: "ALL USER SUCCESS",
                data: allProduct,
                total: totalProduct,
                pageCurrent: Number(page) + 1,
                totalPage: Math.ceil(totalProduct / limit),
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
