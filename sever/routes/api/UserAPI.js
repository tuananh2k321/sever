var express = require('express');
var router = express.Router();
const userController = require('../../components/user/UserController')
const validation = require('../../midle/Validation')
const jwt = require('jsonwebtoken')

// http://localhost:3000/api/user/login
router.post('/login', async function (req, res, next) { 

    try {
        const {email, password} = req.body
        const user = await userController.login(email, password);
        if (user) {
            // tạo token
            const token = jwt.sign({user}, 'secret', {expiresIn: '1h'})
            return res.status(200).json({result: true, user: user,  token: token})
        }
        return res.status(400).json({result: true, user: null,})
    } catch (error) {
        console.log(error);
        // next(error) chỉ chạy web
        res.status(400).json({result: false, user: null});
    }
})


// http://localhost:3000/api/user/register
router.post('/register', [validation.checkRegister], async function (req, res, next) { 
    try {
        const {email, password, name} = req.body
        const result = await userController.register(email, password, name);
        const user = await userController.login(email, password);
        if (user) {
            // tạo token
            const token = jwt.sign({user}, 'secret', {expiresIn: '1h'})
            return res.status(200).json({result: result, user: user,  token: token})
        }
    } catch (error) {
        console.log(error);
        // next(error) chỉ chạy web
        res.status(400).json({result: false});
    }
})

module.exports = router;