

const CategoryService = require('./CategoryService')

const getAllCategory = async () => {
    try {
      return await CategoryService.getAllCategory();
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

module.exports = {getAllCategory}