const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { generalAccessToken, generalRefreshToken } = require("./JwtService");
const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = newUser;

        try {
            const checkUser = await User.findOne({
                email: email,
            });
            if (checkUser !== null) {
                resolve({
                    status: "ERROR",
                    message: "The email is already registered.",
                });
            }
            const hast = bcrypt.hashSync(password, 10);
            const createdUser = await User.create({
                name,
                email,
                password: hast,
                phone,
            });

            resolve({
                status: "OK",
                message: "SUCCESS",
                data: createdUser,
            });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};
const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = userLogin;

        try {
            const checkUser = await User.findOne({
                email: email,
            });
            if (checkUser === null) {
                resolve({
                    status: "ERROR",
                    message: "The user is not defined.",
                });
            }
            const comparePassword = bcrypt.compareSync(
                password,
                checkUser.password
            );
            console.log("comparePassword: ", comparePassword);
            if (!comparePassword) {
                resolve({
                    status: "ERROR",
                    message: "The password or user is incorrect.",
                });
            }

            const access_token = await generalAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin,
            });
            const refresh_token = await generalRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin,
            });
            resolve({
                status: "OK",
                message: "SUCCESS",
                access_token,
                refresh_token,
            });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};
const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id,
            });
            if (checkUser === null) {
                resolve({
                    status: "ERROR",
                    message: "The user is not defined.",
                });
            }
            const updateUser = await User.findByIdAndUpdate(id, data, {
                new: true,
            });
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: updateUser,
            });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};
const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id,
            });
            if (checkUser === null) {
                resolve({
                    status: "ERROR",
                    message: "The user is not defined.",
                });
            }
            await User.findOneAndDelete(id);
            resolve({
                status: "OK",
                message: "DELETE USER SUCCESS",
            });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};
const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find();
            resolve({
                status: "OK",
                message: "ALL USER SUCCESS",
                data: allUser,
            });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};
const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id,
            });
            if (user === null) {
                resolve({
                    status: "ERROR",
                    message: "The user is not defined.",
                });
            }
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: user,
            });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};
// const refreshTokenService = (token) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             console.log("token", token);
//             resolve({
//                 status: "OK",
//                 message: "SUCCESS",
//             });
//         } catch (error) {
//             console.log(error);
//             reject(error);
//         }
//     });
// };
module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
};
