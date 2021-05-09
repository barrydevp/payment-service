const {isFunction} = require('./is')

exports.sendSuccess = (req, res) => (data) => {
    res.status(200).json({
        success: true,
        data: data,
    })
}

exports.sendError = (req, res, next) => (error) => {
    next(error)
}

exports.errorHandler = (options = {}) => function (error, req, res, next) {
    const message = typeof error === 'string' ? error : error.message || null
    const code = error.code
    const statusCode = error.statusCode || 500

    const result = {
        success: false,
        message,
        status: statusCode,
    }

    if (code) {
        result.code = code
    }

    if (process.env.NODE_ENV !== 'production') {
        result.details = error.details
        result.stack = error.stack
    }

    res.status(statusCode).json(result)
}

exports.wrapHandler = (callback) => (req, res, next) => {
    const execution = isFunction(callback) ? callback(req, res, next) : callback

    return Promise.resolve(execution).then(exports.sendSuccess(req, res)).catch(exports.sendError(req, res, next))
}
