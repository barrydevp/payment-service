const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        fullName: String,
        username: {
            type: String,
            required: [true, 'User name is required'],
            index: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        email: {
            type: String,
            required: [true, 'Email name is required'],
            index: true,
            unique: true,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        books: [
            {
                foods: [
                    {
                        id: mongoose.Schema.Types.ObjectId,
                        name: String,
                        quantity: {type: Number, default: 0},
                        price: {type: Number, default: 0},
                    },
                ],
                amount: {type: Number, default: 0},
                date: {type: Date, default: Date.now},
            },
        ],
    },
    {collection: 'user', timestamps: true}
)

module.exports = mongoose.model('User', userSchema)
