const router = require('express').Router()
const swagger = require('swagger-ui-express')
const Student = require('./student')

const swaggerDocument = require('../docs/swagger.json')

const Authorization = require('../middleware/auth')
const User = require('./user')

router.use('/api-docs', swagger.serve)
router.get('/api-docs', swagger.setup(swaggerDocument))

router.use('/api/v1/students',Authorization, Student)
router.use('/api/v1/',User)

module.exports = router
