const UserSchema = require('../models/userModel.js')
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt")

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserSchema.findOne({ email: email })
        bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
                const { _id, name, lastName, email, type, birthday, status, createdAt, updatedAt } = user
                const token = jsonwebtoken.sign({ email: user.email, name: `${name} ${lastName}` },
                    process.env.JWT_SECRET, { expiresIn: '1h' },
                    { expiresIn: '10m' })
                const userInfo = { name, lastName, email, type, birthday, status, createdAt, updatedAt, _id }

                // res.status(200).json({ userInfo, token })

                const refreshToken = jsonwebtoken.sign({ email: user.email, name: `${name} ${lastName}` }, process.env.JWT_REFRESH_SECRET, { expiresIn: '1d' })
                res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'Strict' })
                    .header('Authorization', token)
                    .send({ userInfo, token })
            }
        });

    } catch (error) {
        res.status(401).json({ message: 'correo o contraseña incorrecta, por favor intenarlo nuevamente' })
    }
}