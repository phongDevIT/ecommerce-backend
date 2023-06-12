const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const generalAccessToken = async (payload) => {
    const access_token = jwt.sign(
        {
            ...payload,
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: "30s" }
    );
    return access_token;
};
const generalRefreshToken = async (payload) => {
    const refresh_token = jwt.sign(
        {
            ...payload,
        },
        process.env.REFRESH_TOKEN,
        { expiresIn: "365d" }
    );
    return refresh_token;
};
const refreshTokenJwtService = (token) => {
    return new Promise((resolve, reject) => {
        try {
            console.log("token", token);
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if (err) {
                    reject({
                        status: "ERR",
                        message: "The authentication",
                    });
                }
                console.log("user", user);
                const access_token = await generalAccessToken({
                    id: user?.id,
                    isAdmin: user?.isAdmin,
                });
                console.log("access_token: ", access_token);
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    access_token,
                });
            });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};
module.exports = {
    generalAccessToken,
    generalRefreshToken,
    refreshTokenJwtService,
};
