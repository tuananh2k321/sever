var express = require('express');
var router = express.Router()
const productController = require('../../components/product/ProductController')
const authen = require('../../midle/Authen')
const upload = require('../../midle/UpLoadFile')
const CONFIG = require('../../config/Config')

// http://localhost:3000/api/product

router.get('/', [authen.authenApp], async function (req, res, next) { 

    try {
        const products = await productController.getAllProduct();
        res.status(200).json({products: products, result: true});
    } catch (error) {
        res.status(400).json({result: false});
    }
})

// http://localhost:3000/api/product/:id
router.get('/:id', async function (req, res, next) { 

    try {
        const {id} = req.params
        const _id = id.toString();
        const product = await productController.getProduct(_id);
        res.status(200).json({products: product, result: true});
    } catch (error) {
        res.status(400).json({result: false});
    }
})


// http://localhost:3000/api/product
router.post('/', async function (req, res, next) { 

    try {
        const { name, price, quantity, image, category } = req.body;
        await productController.addNewProduct(name, price, quantity, image, category);
        res.status(200).json({result: true});
    } catch (error) {
        res.status(400).json({result: false});
    }
})

// http://localhost:3000/api/product/search/name?keyword=iphone
router.get('/search/name', async function (req, res, next) { 
    try {
        const {keyword} = req.query
        const products = await productController.search(keyword);
        res.status(200).json({products: products, result: true});
    } catch (error) {
        res.status(400).json({result: false});
    }
})

// http://localhost:3000/api/product/upload
router.post('/upload', [upload.single('image')], async function (req, res, next) {
    try {
        const {file} = req
        if (!file) {
            return res.status(404).json({result: false});
        } else {
            const url = `${CONFIG.CONSTANTS.IP}/images/${file.filename}`
            return res.status(200).json({result:true, url: url});
        }
    } catch (error) {
        console.log('Upload image error: ', error)
        return res.status(500).json({})
    }
})





module.exports = router;