const productModel = require('../product/ProductModel')
const getAllProduct = async () => {
    try {
        // return data;
        return await productModel.find({})
    } catch (error) {
        console.log('get all product error: ',error)
    }
    return []
}

const getAllProduct2 = async () => {
  try {
      // return data;
      return await productModel.find({}, 'name price category') // lấy 2 field name price
      .populate('category', 'name') // dùng khóa ngoại để truy xuất 
      .sort({price: -1}) // sắp xếp giảm dần theo giá
      .skip(2)
      .limit(2)
  } catch (error) {
      console.log('get all product error: ',error)
  }
  return []
}

const deleteProduct = async (id) => {
    try {
        // const index = data.findIndex(item => item._id.toString() == id.toString());
        
    // if (index >= 0) {
    //     data.splice(index, 1);
    // }
    await productModel.findByIdAndDelete(id);
    return true
    } catch (error) {
        console.log('delete product: ',error)
    }
    return []
}

const addNewProduct = async ( name, price, quantity, image, category) => {
  try {
      const newProduct = {
        name,
        price,
        quantity,
        image,
        category
      }
      // data.push(newProduct);
      await productModel.create(newProduct);
      return true
  } catch (error) {
      console.log('insert error: ',error)
  }
  return false;
}

const updateProduct = async (id, name, price, quantity, image, category) => {
  try {
    // let product = data.find(item => item._id.toString() == id.toString())
    let item = await productModel.findById(id);
    // if (product) {
    //     data = data.map(item => {
    //       if (item._id.toString() == id.toString()) {
    //         item.name = name ? name : item.name
    //         item.price = price ? price : item.price
    //         item.quantity = quantity ? quantity : item.quantity
    //         item.image = image ? image : item.image
    //         item.category = category ? category : item.category
    //       }
    //       return item
    //   })
    //   return true
    // }

    if (item) {
            item.name = name ? name : item.name
            item.price = price ? price : item.price
            item.quantity = quantity ? quantity : item.quantity
            item.image = image ? image : item.image
            item.category = category ? category : item.category
            await item.save()
            return true
    }
    
  } catch (error) {
      console.log('update product error: ',error)
      
  }
  return false
}

const getProduct = async (id) => {
  try {
    // let product = data.find(item => item._id.toString() == id.toString())
    let product = await productModel.findById(id)
    return product
  } catch (error) {
      console.log('get product error: ',error)
      throw error
  }
  return null;
}

const search = async (keyword) => {
  try {
    // gather than >, less than <, lte <=
    let query = {
      //price: { $gt: 1000, $lt: 2000},
      //$or: [{quantity: {$lte: 100}}, {quantity: {$gt: 20}}],
      // tìm kiếm có chứa keyword
      name: { $regex: keyword, $options: 'i'},
      // tìm kiếm theo tên
      // name: keyword,
    }
    // price > 1000 AND price < 2000
    // quantity >= 100 OR quantity > 20
    let product = await productModel.find(query)
    return product
  } catch (error) {
      console.log('Search error: ',error)
      throw error
  }
}

module.exports = {getAllProduct, deleteProduct, addNewProduct, updateProduct, getProduct, search, getAllProduct2}

var data = [{
    "_id": 1,
    "name": "Demivee",
    "price": 97,
    "quantity": 33,
    "image": "https://chamsocdidong.com/uploads/2020/10/sua-loi-phan-mem-iphone-12-mini-1.jpg",
    "category": 1
  }, {
    "_id": 2,
    "name": "Abatz",
    "price": 4,
    "quantity": 4,
    "image": "https://chamsocdidong.com/uploads/2020/10/sua-loi-phan-mem-iphone-12-mini-1.jpg",
    "category": 10
  }, {
    "_id": 3,
    "name": "Zoombox",
    "price": 86,
    "quantity": 99,
    "image": "https://chamsocdidong.com/uploads/2020/10/sua-loi-phan-mem-iphone-12-mini-1.jpg",
    "category": 4
  }, {
    "_id": 4,
    "name": "Browsedrive",
    "price": 16,
    "quantity": 96,
    "image": "https://chamsocdidong.com/uploads/2020/10/sua-loi-phan-mem-iphone-12-mini-1.jpg",
    "category": 7
  }, {
    "_id": 5,
    "name": "Kwilith",
    "price": 20,
    "quantity": 28,
    "image": "https://chamsocdidong.com/uploads/2020/10/sua-loi-phan-mem-iphone-12-mini-1.jpg",
    "category": 7
  }, {
    "_id": 6,
    "name": "Flipopia",
    "price": 17,
    "quantity": 62,
    "image": "https://chamsocdidong.com/uploads/2020/10/sua-loi-phan-mem-iphone-12-mini-1.jpg",
    "category": 6
  }, {
    "_id": 7,
    "name": "Jaxspan",
    "price": 46,
    "quantity": 15,
    "image": "https://chamsocdidong.com/uploads/2020/10/sua-loi-phan-mem-iphone-12-mini-1.jpg",
    "category": 10
  }, {
    "_id": 8,
    "name": "Oyondu",
    "price": 100,
    "quantity": 70,
    "image": "https://chamsocdidong.com/uploads/2020/10/sua-loi-phan-mem-iphone-12-mini-1.jpg",
    "category": 6
  }, {
    "_id": 9,
    "name": "Izio",
    "price": 18,
    "quantity": 73,
    "image": "https://chamsocdidong.com/uploads/2020/10/sua-loi-phan-mem-iphone-12-mini-1.jpg",
    "category": 2
  }, {
    "_id": 10,
    "name": "Skinte",
    "price": 13,
    "quantity": 18,
    "image": "https://chamsocdidong.com/uploads/2020/10/sua-loi-phan-mem-iphone-12-mini-1.jpg",
    "category": 1
  }, {
    "_id": 11,
    "name": "Quatz",
    "price": 76,
    "quantity": 39,
    "image": "https://chamsocdidong.com/uploads/2020/10/sua-loi-phan-mem-iphone-12-mini-1.jpg",
    "category": 1
  }, {
    "_id": 12,
    "name": "Tagchat",
    "price": 27,
    "quantity": 12,
    "image": "https://chamsocdidong.com/uploads/2020/10/sua-loi-phan-mem-iphone-12-mini-1.jpg",
    "category": 6
  }, {
    "_id": 13,
    "name": "Jetpulse",
    "price": 56,
    "quantity": 32,
    "image": "https://chamsocdidong.com/uploads/2020/10/sua-loi-phan-mem-iphone-12-mini-1.jpg",
    "category": 6
  }, {
    "_id": 14,
    "name": "Blognation",
    "price": 71,
    "quantity": 22,
    "image": "https://chamsocdidong.com/uploads/2020/10/sua-loi-phan-mem-iphone-12-mini-1.jpg",
    "category": 4
  }, {
    "_id": 15,
    "name": "Oyondu",
    "price": 82,
    "quantity": 60,
    "image": "https://chamsocdidong.com/uploads/2020/10/sua-loi-phan-mem-iphone-12-mini-1.jpg",
    "category": 10
  }, {
    "_id": 16,
    "name": "Leenti",
    "price": 39,
    "quantity": 93,
    "image": "https://chamsocdidong.com/uploads/2020/10/sua-loi-phan-mem-iphone-12-mini-1.jpg",
    "category": 6
  }, {
    "_id": 17,
    "name": "Thoughtbeat",
    "price": 96,
    "quantity": 38,
    "image": "https://chamsocdidong.com/uploads/2020/10/sua-loi-phan-mem-iphone-12-mini-1.jpg",
    "category": 1
  }, {
    "_id": 18,
    "name": "Livetube",
    "price": 79,
    "quantity": 50,
    "image": "https://chamsocdidong.com/uploads/2020/10/sua-loi-phan-mem-iphone-12-mini-1.jpg",
    "category": 3
  }, {
    "_id": 19,
    "name": "Jaxbean",
    "price": 42,
    "quantity": 26,
    "image": "https://chamsocdidong.com/uploads/2020/10/sua-loi-phan-mem-iphone-12-mini-1.jpg",
    "category": 8
  }, {
    "_id": 20,
    "name": "LiveZ",
    "price": 37,
    "quantity": 65,
    "image": "https://chamsocdidong.com/uploads/2020/10/sua-loi-phan-mem-iphone-12-mini-1.jpg",
    "category": 6
  }]