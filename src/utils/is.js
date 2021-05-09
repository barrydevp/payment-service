exports.addLeadingSlash = (path) =>
    path ? (path.charAt(0) !== '/' ? '/' + path : path) : ''

/**
 * Deprecated. Use the "addLeadingSlash" function instead.
 * @deprecated
 */
exports.serializePath = exports.addLeadingSlash

exports.isArray = Array.isArray
exports.isDate = (date) => !isNaN(Date.parse(date))
exports.isFunction = (fn) => typeof fn === 'function'
exports.isString = (fn) => typeof fn === 'string'
exports.isConstructor = (fn) => fn === 'constructor'
exports.isUndefined = (obj) => typeof obj === 'undefined'
exports.isNil = (obj) => exports.isUndefined(obj) || obj === null
exports.isEmpty = (array) => !(array && array.length > 0)
exports.isObject = (fn) => !exports.isNil(fn) && !exports.isArray(fn) && typeof fn === 'object'
exports.isPlainObject = (fn) => {
    if (!exports.isObject(fn)) {
        return false
    }
    const proto = Object.getPrototypeOf(fn)
    if (proto === null) {
        return true
    }
    const ctor =
        Object.prototype.hasOwnProperty.call(proto, 'constructor') &&
        proto.constructor
    return (
        typeof ctor === 'function' &&
        ctor instanceof ctor &&
        Function.prototype.toString.call(ctor) ===
        Function.prototype.toString.call(Object)
    )
}
exports.isPromise = (p) => p && exports.isFunction(p.then)
exports.isIterator = (it) => it && exports.isFunction(it.next) && exports.isFunction(it.throw)
exports.isIterable = (it) =>
    it && exports.isFunction(Symbol) ? exports.isFunction(it[Symbol.iterator]) : exports.isArray(it)
exports.isStringableFunc = (f) => exports.isFunction(f) && f.hasOwnProperty('toString')
exports.isSymbol = (sym) =>
    Boolean(sym) &&
    typeof Symbol === 'function' &&
    sym.constructor === Symbol &&
    sym !== Symbol.prototype
