const { Router } = require('express')

const controller = require('../controllers/controllers')


const router = Router()

router.get('/api', (req, res) => {
    console.log('hello1')
    res.send('hello world1')
})
router.post("/api/registration", controller.registration)
router.post('/api/quests', controller.quests)
router.post('/api/tasks', controller.tasks)

// router.post('/api/farming', (req, res) => {
//     res.send('farming')
// })

// router.post('/api/farming/click', (req, res) => {
//     res.send('click')
// })



module.exports = router