const { students } = require('../models')

const getStudents = async (req, res) => {
  try {
    const data = await students.findAll({
      order: [['id', 'Asc']]
    })

    res.status(200).json({
      status: 'success',
      data
    })
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err.message
    })
  }
}

module.exports = {
  getStudents
}
