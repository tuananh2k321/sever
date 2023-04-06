var express = require('express');
var router = express.Router();
const userController = require('../components/user/UserController');
const jwt = require('jsonwebtoken')
const authen = require('../midle/Authen')
const validation = require('../midle/Validation')

/* GET home page. */
// http://http://localhost:3000/body

// router.post('/body', async function(req, res, next) {
  

//   res.render('index', { title: 'Express',  x: root1, y: root2 });
// });

// http://localhost:3000/params/1/2/3
// router.get('/params/:a/:b/:c', function(req, res, next) {
//   const {a, b, c} = req.params;
//   const kq =`a = ${a}, b = ${b}, c = ${c}`
//   res.render('index', { title: 'Express', kq: kq });
// });

// http://localhost:3000/ket-hop?name=abc&age=18
// router.get('/ket-hop', function(req, res, next) {
//   const {name, age} = req.query;
//   const kq =` name = ${name}, age = ${age}`
//   res.render('index', { title: 'Express', kq: kq });
// });

// http://localhost:3000/HinhTron/?a=abc&b=18
// http://localhost:3000/HinhChuNhat/?a=abc&b=18

// Dạng json
// http://localhost:3000/ket-hop/loai?name=abc&age=18
// router.get('/ket-hop1/:loai', function(req, res, next) {
//   const {loai} = req.params
//   const {name, age} = req.query;
//   const kq =`loai = ${loai}, name = ${name}, age = ${age}`
//   res.json( { title: 'Express', kq: kq });
// });

 // http://localhost:3000/
 // Hiển thị trang chử
router.get('/', [authen.authenWeb], function(req, res, next) {
  res.render('index')
})

// http://localhost:3000/login
// Hiển thị trang Login
router.get('/login', [authen.authenWeb], function(req, res, next) {
  res.render('user/login')
})

// http://localhost:3000
// Xử lí trang Login
router.post('/login', [authen.authenWeb], async function(req, res, next) {
  const { email, password } = req.body;
  const result = await userController.login(email, password);

  if (result) {
    const token = jwt.sign({ _id: result._id }, 'secret');
    req.session.token = token;
    console.log('token: ', token);
    
      return res.redirect('/');
    
  } else {
    return res.redirect('/login');
  }
});

//http://localhost:3000/register
router.get('/register', function(req, res, next) {
  res.render('user/register')
})

//http://localhost:3000/register
router.post('/register', [validation.checkRegister], async function(req, res, next) {
  const { email, password, name } = req.body;
  const result = await userController.register(email, password, name);
  const user = await userController.login(email, password);

  // if (user) {
  //     // tạo token
  //     const token = jwt.sign({user}, 'secret', {expiresIn: '1h'})
  //     return res.status(200).json({result: result, user: user,  token: token})
  // }

  if (user) {
    const token = jwt.sign({ _id: user._id }, 'secret', {expiresIn: '1h'});
    req.session.token = token;
    console.log('token: ', token);
    console.log("register: ", result)
    return res.redirect('/');
    
  } else {
    return res.redirect('/register');
  }
});

// http://localhost:3000/logout
router.get('/logout',  function(req, res, next) {
  req.session.destroy()
  res.redirect('/login')
})




module.exports = router;

/*

req, res, next
req: request - từ client gửi lên
-req.query: lấy dữ liệu từ query string
-req.body: lấy dữ liệu từ form
-req.params: lấy dữ liệu từ url

res: response - từ sever gửi về
-res.render: render ra file html (WEB) Sever Side Rendering
-res.json: trả về dữ liệu dạng json (API) Client Side Rendering
-res.redirect: chuyển hướng trang

next: hàm tiếp theo


*/

/*

HTTP REQUEST METHODS
GET - Read (gõ link trên trình duyệt)
POST - Create
*/