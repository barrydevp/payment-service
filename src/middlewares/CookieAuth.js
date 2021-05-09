const logger = require('../utils/logger')('cookie-auth')
const {HttpException} = require('../utils/Exceptions')

const _injectAuthenticateData = (req, payload) => {
    const {userId} = payload

    req['__auth_payload'] = payload
    req['__auth_user_id'] = userId
}

exports.isAuthenticated = (req, res, next) => {
    try {
        const signedCookies = req.signedCookies

        if (!signedCookies) {
            next(new HttpException(`No cookie provided.`, 403))
        }

        const {user_id: userId} = signedCookies

        if (!userId) {
            next(new HttpException(`Something went wrong. Please sign in again.`, 403))
        }

        _injectAuthenticateData(req, {
            userId,
        })

        next()
    } catch (e) {
        logger(`Cannot recognized User.`)
        next(e)
    }
}

exports.getUserId = (req) => {
    return req['__auth_user_id'] || ''
}

exports.getAuthPayload = (req) => {
    return req['__auth_payload']
}

exports.setAuthCookie = (res, payload) => {
    const {userId} = payload

    res.cookie('user_id', userId, {
        signed: true,
    })
}