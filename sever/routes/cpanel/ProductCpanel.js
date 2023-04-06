var express = require('express');
var router = express.Router();
const productController = require('../../components/product/ProductController')
const categoryController = require('../../components/category/CategoryController')
const upLoadFile = require('../../midle/UpLoadFile')
const CONFIG = require('../../config/Config')
const authen = require('../../midle/Authen')

// http://localhost:3000/cpanel/product/

router.get('/', [authen.authenWeb], async function(req, res, next) {
    const products = await productController.getAllProduct()
    res.render('product/table', {products})
})

// http://localhost:3000/cpanel/product/:id/delete

router.get('/:id/delete', [authen.authenWeb],  async function(req, res, next) {
    const {id} = req.params;
    try {
        
        await productController.deleteProduct(id)
        return res.json({status: true, id: id})
    } catch (error) {
        console.log(error)
        return res.json({status: false, error: id})
    }
    
})

// http://localhost:3000/cpanel/product/new 

router.get('/new', [authen.authenWeb],   async function(req, res, next) {
    const categories = await categoryController.getAllCategory()
    res.render('product/new', {categories})
})


// http://localhost:3000/cpanel/product/new 
//xử lí thêm mới sản phẩm
router.post('/new', [authen.authenWeb, upLoadFile.single('image'),],  async function(req, res, next) {
    try {
        
        let {body, file} = req;
        if (file) {
            let image = `${CONFIG.CONSTANTS.IP}/images/${file.filename}`
            //let image = `http://192.168.1.6:3000/images/${file.filename}`
            body = {...body, image: image}
        }
        // image = 'https://taimienphi.vn/tmp/cf/aut/anh-gai-xinh-1.jpg'
        let {name, price, quantity, image, category} = body;
        console.log('=>> ',name, price, quantity, image, category)
        await productController.addNewProduct(name, price, quantity, image, category)
        return res.redirect('/cpanel/product')
    } catch (error) {
        console.log(error)
    }
})

// http://localhost:3000/cpanel/product/:id/edit 
// hiển thị trang cập nhật sản phẩm

router.get('/:id/edit', [authen.authenWeb],  async function(req, res, next) {
    try {
        const {id} = req.params;
        const product = await productController.getProduct(id)
        let categories = await categoryController.getAllCategory()
        for (let index = 0; index < categories.length; index++) {
            const element = categories[index]
            categories[index].selected = false
            if (element._id.toString() == product.category.toString()) {
                categories[index].selected = true
            } 
        }

        res.render('product/edit', {product, categories})
    } catch (error) {
        console.log(error)
    }
    
})

// http://localhost:3000/cpanel/product/:id/edit 
// hiển thị trang cập nhật sản phẩm
router.post('/:id/edit', [authen.authenWeb, upLoadFile.single('image'), ],  async function(req, res, next) {
    try {
        let {id} = req.params
        
        let {body, file} = req;
        if (file) {
            let image = `${CONFIG.CONSTANTS.IP}/images/${file.filename}`
            // let image = 'https://172.16.87.74:3000/images/${file.filedname}'
            body = {...body, image: image}
        }
        // image = 'https://taimienphi.vn/tmp/cf/aut/anh-gai-xinh-1.jpg'

        let {name, price, quantity, image, category} = body;
        console.log('=>> ',name, price, quantity, image, category)
        await productController.updateProduct(id, name, price, quantity, image, category)
        return res.redirect('/cpanel/product')
    } catch (error) {
        console.log(error)
    }
})

// http://localhost:3000/cpanel/product/search 

router.post('/search', async function (req, res, next) { 
    try {
        const {keyword} = req.body
        const products = await productController.search(keyword);
        console.log('=>> ',products)
        console.log('=>> ',CONFIG.CONSTANTS.IP)
        // res.redirect('/cpanel/product');
        res.render('product/table', {products})
    } catch (error) {
        res.status(400).json({});
    }
})

module.exports = router;

