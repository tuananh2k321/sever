const userService = require('./UserService');
const mailer = require('nodemailer');

const login = async (email, password) => {
    try {
        return await userService.login(email, password)
    } catch (error) {
        console.log(error)
    }
}

const register = async (email, password) => {
    try {
        return await userService.register(email, password)
    } catch (error) {
        console.log(error)
    }
    
}

const transporter = mailer.createTransport({
    pool: true,
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use TLS
    auth: {
        user: 'xxxxxxx',
        pass: 'gxeazzetinkwtsuy'
    },
});

module.exports = {login, register}