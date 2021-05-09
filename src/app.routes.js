const express = require('express')
const router = express.Router()

const CookieAuth = require('./middlewares/CookieAuth')

router.use('/stripe', CookieAuth.isAuthenticated, require('./routes/StripeRoute'))

router.post('/auth', async (req, res, next) => {
    const UserModel = require('./models/UserModel')

    const user = await UserModel.findOne({
        username: 'user',
    }).lean()

    if (!user) next(new Error(`User Notfound.`))

    CookieAuth.setAuthCookie(res, {
        userId: user._id.toString(),
    })

    res.json({
        success: true,
        user: user,
    })
})

router.get('/me', CookieAuth.isAuthenticated, (req, res, next) => {
    res.json({
        success: true,
        user_id: CookieAuth.getUserId(req),
        payload: CookieAuth.getAuthPayload(req),
    })
})

router.get('/test', (req, res) => {
    res.send('ok')
})

module.exports = router