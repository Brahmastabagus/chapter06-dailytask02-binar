const { students } = require('../models')

const getStudents = async (req, res) => {
  try {
    const data = await students.findAll({
      order: [['id', 'Asc']],
    })

    return res.status(200).json({
      status: 'success',
      data,
    })
  } catch (err) {
    return res.status(400).json({
      status: 'failed',
      message: err.message,
    })
  }
}

const getIdStudent = async (req, res) => {
  try {
    // const { name, price, stock } = req.body
    const id = req.params.id
    const data = await students.findByPk(id)

    // TODO: Validasi apakah id ada
    if (data === null) {
      return res.status(404).json({
        status: 'failed',
        message: `Data dengan id ${id}, tidak ditemukan`,
      })
    }

    return res.status(200).json({
      status: 'success',
      data,
    })
  } catch (err) {
    return res.status(400).json({
      status: 'failed',
      message: err.message,
    })
  }
}

const deleteStudent = async (req, res) => {
  try {
    const id = req.params.id

    const dataId = await students.findByPk(id)

    // TODO: Validasi apakah id ada
    if (dataId === null) {
      return res.status(404).json({
        status: 'failed',
        message: `Data dengan id ${id}, tidak ditemukan`,
      })
    }

    await students.destroy({
      where: {
        id,
      },
    })

    return res.status(200).json({
      status: 'success',
      message: `Data dengan index ${id} telah berhasil terhapus`,
    })
  } catch (err) {
    return res.status(400).json({
      status: 'failed',
      message: err.message,
    })
  }
}

module.exports = { getStudents, getIdStudent, deleteStudent }
