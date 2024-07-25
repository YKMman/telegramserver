const { Router } = require('express')
const controller = require('../controllers/controllers')

const router = Router()

router.post("/api/registration", controller.registration)

// router.post('/api/farming', (req, res) => {
//     res.send('farming')
// })

// router.post('/api/farming/click', (req, res) => {
//     res.send('click')
// })

router.post('/api/quests', (req, res) => {
    res.send('quest')
})

module.exports = router