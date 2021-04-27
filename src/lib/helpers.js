const bcrypt = require("bcryptjs");

const helpers = {};

helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10); // generate an algorithm
    const hash = await bcrypt.hash(password, salt); // apply the salt to the password
    return hash;
};

helpers.matchPassword = async (password, savedPassword) => {
    try {
        await bcrypt.compare(password, savedPassword);
    } catch (error) {
        console.log(error);
    }
};

module.exports = helpers;