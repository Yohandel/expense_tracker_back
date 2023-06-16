const UserSchema = require('../models/userModel.js')
const jsonwebtoken = require("jsonwebtoken");

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserSchema.findOne({ email: email, password: password })
        const {name, lastName} = user
        res.status(200).json({
            userInfo: user,
            token: jsonwebtoken.sign(
                {
                    email: user.email,
                    name: `${name} ${lastName}`
                },
                process.env.JWT_SECRET)
        })
    } catch (error) {
        res.status(401).json({ message: 'correo o contraseña incorrecta, por favor intenarlo nuevamente' })
    }
}