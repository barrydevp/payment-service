const logger = require('../utils/logger')('mongodb')
const mongoose = require('mongoose')

const getEnv = require('../utils/getEnv')

const {uri, config} = getEnv('/mongodb')

module.exports = () => {
    mongoose
        .connect(uri, config)
        .catch((error) => logger('❌ MongoDB connection failed', error))

    mongoose.connection.on('connecting', () => {
        logger('✔️  MongoDB connecting')
    })

    mongoose.connection.on('connected', () => {
        logger('✔️  MongoDB connection succeeded')
    })

    mongoose.connection.on('disconnecting', () => {
        logger('⚠️  MongoDB disconnecting')
    })

    mongoose.connection.on('error', (error) => {
        logger('❌  MongoDB connection failed', error)
    })

    return mongoose.connection
}
