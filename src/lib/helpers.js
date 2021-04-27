const bcrypt = require("bcryptjs");

const helpers = {};

helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10); // generate an algorithm
    const hash = await bcrypt.hash(password, salt); // apply the salt to the password
    return hash;
};

helpers.matchPassword = async (password, savedPassword) => {
    try {
        const res = await bcrypt.compare(password, savedPassword);
        return res; // returns a boolean
    } catch (error) {
        console.log(error);
    }
};

module.exports = helpers;