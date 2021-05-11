const Confidence = require('confidence')

const config = {
    port: {
        $filter: 'env',
        $default: process.env.PORT || 5400,
        staging: process.env.PORT || 5400,
        production: process.env.PORT || 5400
    },

    cookie: {
        $filter: 'env',
        development: {
            secret: process.env.COOKIE_SECRET || '%HGHS^#@',
        },
        production: process.env.PORT || 5400
    },

    mongodb: {
        $filter: 'env',
        development: {
            uri: process.env.MONGO_URI || 'mongodb+srv://guest:AIFqS2xC9K7Ew6dE@cluster0.iueyv.mongodb.net/booking?retryWrites=true&w=majority',
            config: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
                // poolSize: 10,
            },
        },
    },

    redis: {
        $filter: 'env',
        development: process.env.REDIS_URI || '',
    },

    stripe: {
        $filter: 'env',
        development: {
            secretKey: process.env.STRIPE_SECRET_KEY || 'sk_test_51ImaPaDu0dm6Zw2wXck4AbTDkKrhKepRoRkoKQjZ7MZvPeSiofbf5aWMgUr0rMekjV9ZSW4bsni3laCsAAGRJYgg00RepGYgmC',
            publicKey: process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_51ImaPaDu0dm6Zw2wAfpWVarsHlqIzMgwEgZNUF2jNn88qWo6PvfET5TN4k6CUDCdGWLTqOJWpbJSiI8wHzmlU3Ur0024a3Py0c',
            apiVersion: process.env.STRIPE_API_VERSION || '2020-08-27',
        },
    },

    paypal: {
        $filter: 'env',
        development: {
            clientId: process.env.PAYPAL_CLIENT_ID || 'AZE2PpEnEIvywIJZz-ZLa-CWCJtoxK2aCh9acfDNWZrIB-gArv-m2GG5Vnsclc1ehWBKPpY8mbT7Px4w',
            clientSecret: process.env.PAYPAL_CLIENT_SECRET || 'EOvmnvH9-ee4rtoFS2sBaCtyk071hEEBNKTodaYJI2LTYvDNTvJnsEi3CbIO-j4dSnxcXg6sg0SlxYsS' ,
        },
    },
}

const store = new Confidence.Store(config)
const criteria = {
    env: process.env.NODE_ENV || 'development'
}

module.exports = (key, defaultValue = null) => {
    return store.get(key, criteria) || defaultValue
}