const router = require('express').Router()
const swagger = require('swagger-ui-express')
const Student = require('./student')

// const swaggerDocument = require('../docs/swagger.json')

// router.use('/api-docs', swagger.serve)
// router.get('/api-docs', swagger.setup(swaggerDocument))

router.use('/api/v1/students', Student)

module.exports = router
