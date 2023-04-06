const userModel = require('./UserModel')
const bcrypt = require('bcryptjs');

const login = async (email, password) => {
    try {
      // const user = users.find((u) => u.email == email);
      // if (user && user.password === password) {
      //   return user;
      // }
      // return null;
      const user = await userModel.findOne({email: email}) 
      
      if (user) {
        let check = bcrypt.compareSync(password, user.password)
        console.log('check: ',check)
        console.log(user.password)
        return check ? user : false
      }
    } catch (error) {
      console.log("login error: ",error);
    }
    return false
}


const register = async (email, password, name) => {
    try {
      // const user = users.find((u) => u.email.toString() == email.toString());
      const user = await userModel.findOne({email: email})
      if (!user) {
        // const newUser = {
        //   _id: users.length +1,
        //   email: email,
        //   password: password,
        //   name: name
        // }
        // users.push(newUser);
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = {email, password: hash, name};
        await userModel.create(newUser);
        return true;
      }
    } catch (error) {
      console.log('register error: ',error);
    }
    return false;
    
}


module.exports = {login, register}

var users = [
    {
        _id: 1,
        email: 'abc@gmail.com',
        name: 'Nguyễn A',
        password: '123'
    },
    {
        _id: 2,
        email: 'abc@gmail.com',
        name: 'Nguyễn B',
        password: '123'
    },
    {
        _id: 3,
        email: 'abc@gmail.com',
        name: 'Nguyễn C',
        password: '123'
    },
]