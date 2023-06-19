const UserSchema = require('../models/userModel.js')
const bcrypt = require("bcrypt")

exports.addUser = async (req, res) => {
    const { name, lastName, email, password, birthday, type } = req.body
    const existingUser = await UserSchema.findOne({ email: email })

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
            res.status(200).json({ Message: 'User Created', id: user._id })
        } catch (error) {

            res.status(500).json({ Message: 'Server Error' })
        }
    });



}

exports.getUsers = async (req, res) => {
    try {
        const users = await UserSchema.find({ status: true }).sort({ createdAt: -1 })
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({ Message: 'Server Error', error: err })
    }
}

exports.deleteUser = async (req, res) => {

    const { id } = req.params;
    UserSchema.findByIdAndUpdate(id, { status: false }).then((result) => {
        res.status(200).json({ Message: 'User Deleted', result })
    }).catch((err) => {
        res.status(500).json({ Message: 'Server Error' })
    });
}

function encryptPassword(password) {
    bcrypt.hash(password, 10, function (err, hash) {
        let encryptedPassword = hash
        return encryptedPassword
    });
}