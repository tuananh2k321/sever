const categoryModel = require('../../components/category/CategoryModel')


const getAllCategory = async () => {
    try {
        // return await data
        return await categoryModel.find({})
    } catch (error) {
        console.log(error)
        
    }
    return []
}

module.exports = {getAllCategory}

var data = [{
    "_id": 1,
    "name": "Gettysburg Regional Airport"
  }, {
    "_id": 2,
    "name": "Randolph Air Force Base"
  }, {
    "_id": 3,
    "name": "Oranjemund Airport"
  }, {
    "_id": 4,
    "name": "La Romaine Airport"
  }, {
    "_id": 5,
    "name": "Armando Schwarck Airport"
  }, {
    "_id": 6,
    "name": "Lanyu Airport"
  }, {
    "_id": 7,
    "name": "Rochester Airport"
  }, {
    "_id": 8,
    "name": "W. H. Bramble Airport"
  }, {
    "_id": 9,
    "name": "Udorn Air Base"
  }, {
    "_id": 10,
    "name": "Ivato Airport"
  }]