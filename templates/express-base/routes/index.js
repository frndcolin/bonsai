const express = require('express')
const router = express.Router()
const baseController = require('../controllers/baseController')
const { catchErrors } = require('../handlers/errorHandlers')

router.get('/', catchErrors(baseController.index))

module.exports = router
