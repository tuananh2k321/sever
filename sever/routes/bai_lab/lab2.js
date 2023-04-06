var express = require('express');
var router = express.Router();

// http://localhost:3000/lab2

// http://localhost:3000/lab2/hinh-tron?&a=10&b=20&r=2&h=5
router.get('/:loaihinh', function(req, res, next) {
    const {loaihinh} = req.params
    const {a, b, r, h} = req.query;
    const pi = 3.14
    let kq;

    if (loaihinh == "hinh-chu-nhat") {
        kq =`Hình chữ nhật: (${a} * ${b}) = ${(a*b)}`
    } else if (loaihinh == "hinh-tron") {
        kq =`Hình tròn: ${r}*${r}*${pi} = ${(r*r)*pi}`
    } else if (loaihinh == "hinh-tam-giac") {
        kq =`Hình tam giác: (${a}*${h})/2 = ${(a*h)/2}`
    }

    
    res.render('lab2', { kq: kq });
  });


// http://localhost:3000/lab2/body?&a=10&b=20&r=2&c=5
router.post('/body', function(req, res, next) {
    const { loaihinh} = req.body
    const {a, b, c, r} = req.query
    const pi = 3.14
    let kq;

    if (loaihinh == "hinh-chu-nhat") {
        kq =`Hình chữ nhật: (${a} + ${b})*2 = ${(a+b)*2}`
    } else if (loaihinh == "hinh-tron") {
        kq =`Hình tròn: 2*${r}*${pi} = ${(r*2)*pi}`
    } else if (loaihinh == "hinh-tam-giac") {
        kq =`Hình tam giác: ${a}+${b}+${c} = ${a+b+c}`
    }

    
    res.json({ a: a, b: b, c: c, r: r, result: kq });
  });

  

module.exports = router;