/**
 * Load configs.
 */
const pathConfig = process.env.NODE_ENV === 'production' ? 'production.env' : 'dev.env'
console.log('ENV:', process.env.NODE_ENV)
require('dotenv').config({
    path: pathConfig
})

try {
    require('./src/app')
} catch (e) {
    console.error('Crash app.')
    console.log(e)
    process.exit(1)
}

