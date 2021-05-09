const logger = require('./logger')(`validator`)

const _injectValidatedBody = (res, body) => {
    res.locals.__vBody = body
}

exports.getValidatedBody = (res) => {
    return res.locals.__vBody
}

const _defaultGetBody = (req) => {
    return req.body
}

const _defaultOptions = {
    allowUnknown: true,
}

exports.createValidatorMiddleware = (schema, getBody = _defaultGetBody, options = _defaultOptions) => async (req, res, next) => {
    try {
        const value = await schema.validateAsync(getBody(req, res), options)

        _injectValidatedBody(res, value)

        next()
    } catch (e) {
        e.statusCode = 400
        logger(e)

        next(e)
    }
}