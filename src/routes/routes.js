const { Router } = require('express')
const controller = require('../controllers/controllers')

const router = Router()

router.post('/api', (req, res) => {
    res.send('hello world')
})
router.post("/api/registration", controller.registration)
router.post('/api/quests', controller.quests)

// router.post('/api/farming', (req, res) => {
//     res.send('farming')
// })

// router.post('/api/farming/click', (req, res) => {
//     res.send('click')
// })



module.exports = router