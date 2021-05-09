class BaseException extends Error {
    constructor(message, code) {
        super(message)

        /**
         * Set error message
         */
        Object.defineProperty(this, 'message', {
            configurable: true,
            enumerable: false,
            value: code ? `${code}: ${message}` : message,
            writable: true,
        })

        /**
         * Set error name as a public property
         */
        Object.defineProperty(this, 'name', {
            configurable: true,
            enumerable: false,
            value: this.constructor.name,
            writable: true,
        })

        /**
         * Set error code as a public property (only when defined)
         */
        if (code) {
            Object.defineProperty(this, 'code', {
                configurable: true,
                enumerable: false,
                value: code,
                writable: true,
            })
        }

        /**
         * Update the stack trace
         */
        Error.captureStackTrace(this, this.constructor)
    }
}

class ValidatorException extends BaseException {
}

class HttpException extends BaseException {
    constructor(message, statusCode = 500, code) {
        super(message, code)

        /**
         * Set statusCode as a public property
         */
        Object.defineProperty(this, 'statusCode', {
            configurable: true,
            enumerable: false,
            value: statusCode,
            writable: true,
        })
    }
}

class ActionException extends BaseException {
}

module.exports = {
    BaseException,
    ValidatorException,
    HttpException,
    ActionException,
}
