const { students } = require('../models')


const addStudents = async (req, res) => {
    try {
      const {name, nim,kelas, generation , } = req.body
      const checkRequired = req.body.name && req.body.nim && req.body.kelas && req.body.generation ? true : false


      if (!checkRequired){  
        res.status(401).json({
          status :"failed",
          message: "data tidak lengkap" + name + nim + kelas + generation
        })
      }else if (nim.length < 5){
          res.status(401).json({
            status :"failed",
            message: "data nim tidak sesuai. pastikan digit pada nim!"
        })
      }else{
        const newStudent = await students.create({
          name,
          nim,
          kelas,
          generation
        })
        res.status(201).json({
          status: 'success',
          data : {
            student : newStudent
          }
        })
      }


    } catch (error) {
      res.status(400).json({
        status: 'failed',
        message: error.message
    })
    }
}

const editStudents = async (req, res) => {
  try {
    const {name, nim,kelas, generation } = req.body
    const id = req.params.id
    const checkRequired = req.body.name && req.body.nim && req.body.kelas && req.body.generation ? true : false
    if (!checkRequired){
      res.status(401).json({
        status :"failed",
        message: "data tidak lengkap"
      })
    }else if (nim.length < 5){
      res.status(401).json({
        status :"failed",
        message: "data nim tidak sesuai. pastikan digit pada nim!"
      })
    }else{
      const editStudent = await students.update({
        name,
        nim,
        kelas,
        generation
      }, {
        where: {id}
      })

      if (!editStudent){
        res.status(401).json({
          status :"failed",
          message: "data tidak ditemukan"
      })
      }



      res.status(201).json({
        status: 'success',
        data : {
          msg : `data dari id ${id} nya berhasil berubah`,
          student : editStudent
        }
      })
    }
  } catch (err) {
    
  }
}

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
    const data = await students.findOne({id: {id}})

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

    const dataId = await students.findOne({id: {id}})

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

module.exports = { getStudents, getIdStudent, deleteStudent, addStudents, editStudents }
