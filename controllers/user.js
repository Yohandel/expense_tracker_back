const UserSchema = require('../models/userModel.js')
const bcrypt = require("bcrypt")
const jsonwebtoken = require('jsonwebtoken')

exports.addUser = async (req, res) => {
    const { name, lastName, email, password, birthday, type } = req.body
    const existingUser = await UserSchema.findOne({ email: email })
    const authHeader = req.headers.authorization;
    const token = authHeader.split("")[1];


    jsonwebtoken.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (decoded) {
            if (existingUser) {
                res.status(400).send({ message: 'Este correo ya esta en uso' })
                return
            }

            bcrypt.hash(password, 10, function (err, hash) {
                const user = UserSchema({
                    name,
                    lastName,
                    email,
                    password: hash,
                    birthday,
                    type
                })
                try {
                    if (!name || !lastName || !email || !password || !birthday || !type) {
                        return res.status(400).json({ message: 'All fields are required' })
                    }
                    user.save()
                    res.status(200).json({ Message: 'User Created', user: user })
                } catch (error) {

                    res.status(500).json({ Message: 'Server Error' })
                }
            });
        } else {
            res.status(401).json(err.message)
        }
    })





}

exports.getUsers = async (req, res) => {

    const authHeader = req.headers.authorization
    const token = authHeader.split("")[1];

    jsonwebtoken.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (decoded) {
            try {
                const users = await UserSchema.find({ status: true }).sort({ createdAt: -1 })
                res.status(200).json(users)
            } catch (err) {
                res.status(500).json({ Message: 'Server Error', error: err })
            }
        } else {
            res.status(401).json(err)
        }
    })


}

exports.deleteUser = async (req, res) => {

    const authHeaders = req.headers.authorization
    const token = authHeaders.split("")[1];

    jsonwebtoken.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (decoded) {
            const { id } = req.params;
            UserSchema.findByIdAndUpdate(id, { status: false }).then((result) => {
                res.status(200).json({ Message: 'User Deleted', result })
            }).catch((err) => {
                res.status(500).json({ Message: 'Server Error' })
            });
        } else {
            res.status(401).json(err.message)
        }
    })


}

function encryptPassword(password) {
    bcrypt.hash(password, 10, function (err, hash) {
        let encryptedPassword = hash
        return encryptedPassword
    });
}