const router = require('express').Router()
const studentController = require('../controllers/studentController')

// GET
router.get('/', studentController.getStudents)

// GET by ID
router.get('/:id', studentController.getIdStudent)

// POST 
router.post('/', studentController.addStudents)

// PUT
router.put('/:id', studentController.editStudents)

// DELETE
router.delete('/:id', studentController.deleteStudent)

module.exports = router
