const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const {errorHandler} = require('./utils/handler')
const getEnv = require('./utils/getEnv')

const app = express()

/** Register common Middleware */
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json({limit: '10mb'}))
app.use(bodyParser.urlencoded({extended: true, limit: '10mb'}))
app.use(cookieParser(getEnv('/cookie').secret))
app.use(express.static('.'))
app.use(express.json())

/** Register Route Handler */
app.use(require('./app.routes'))

/** ErrorHandler is the last one */
app.use(errorHandler())

setImmediate(() => {

    /** Initialize */
    require('./connections/mongodb')()

    /** Listening request */
    const port = getEnv('/port')
    app.listen(port, () => console.log(`Node server listening on port ${port}!`))
})
