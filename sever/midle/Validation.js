// bắt lỗi

const checkRegister = async (req, res, next) => { 
    try {
        const {email, password, name, confirmPassword} = req.body
        if (!email || !password || !name || !confirmPassword) {
            return res.status(400).json({result: false, message: 'Vui lòng nhập đầy đủ thông tin'}) 
        } else {
            if (password.toString() !== confirmPassword.toString()) {
                return res.status(400).json({result: false, message: 'Mật khẩu không trùng khớp'})
            }
        }

        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        // if (emailRegex.test(email)) {
        //     return res.status(400).json({result: false, message:'Email không hợp lệ'})
        // }
        next();
    } catch (error) {
        console.log('check register error: ',error);
        return res.status(400).json({result: false})
    }
}


module.exports = {checkRegister}