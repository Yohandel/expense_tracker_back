const UserSchema = require('../models/userModel.js')
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt")

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await UserSchema.findOne({ email: email })
    bcrypt.compare(password, user.password, function (err, result) {
        try {

            if (result) {
                const { _id, name, lastName, email, type, birthday, status, createdAt, updatedAt } = user
                const userInfo = { name, lastName, email, type, birthday, status, createdAt, updatedAt, _id }

                const token = jsonwebtoken.sign(
                    {
                        email: user.email,
                        name: `${name} ${lastName}`
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: '10h' }
                )

                const refreshToken = jsonwebtoken.sign(
                    {
                        email: user.email,
                        name: `${name} ${lastName}`
                    },
                    process.env.JWT_REFRESH_SECRET,
                    { expiresIn: '1d' }
                )

                res.cookie('jwt',
                    refreshToken,
                    {
                        httpOnly: false,
                        secure: true,
                        sameSite: 'None',
                        maxAge:  7 * 24 * 60 * 60 * 1000
                    }
                )

                res.status(200).send({ userInfo, token })
            }


        } catch (error) {
            res.status(401).json({ message: 'correo o contraseña incorrecta, por favor intenarlo nuevamente' })
        }
    });
}

exports.refresh = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) {
        return res.status(401).send({ message: 'Unauthorized' })
    }

    const refreshToken = cookies.jwt

    jsonwebtoken.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Forbidenn' });
        const foundUser = await UserSchema.findOne({ email: decoded.email })

        if (!foundUser) res.status(401).json({ message: 'Unauthorized' });

        const accesToken = jsonwebtoken.sign(
            {
                email: foundUser.email,
                name: `${foundUser.name} ${foundUser.lastName}`
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )

        res.header('Authorization', accesToken)
            .send({ foundUser, accesToken })
    })
}

exports.logout = async (req, res) => {
    const cookies = req.cookies
    console.log(cookies);
    if (!cookies?.jwt) return res.status(204);

    res.clearCookie('jwt',
        {
            httpOnly: false,
            secure: true,
            sameSite: 'None',
            maxAge:  7 * 24 * 60 * 60 * 1000
        }
    )
    res.status(200).send({Message: 'Cookies cleared'})
}