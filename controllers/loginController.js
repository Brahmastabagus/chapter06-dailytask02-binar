const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {users} = require('../models/')



async function register(req,res) {
    try {
        const {email, password} = req.body;
        const checkRequired = req.body.email && req.body.password ? true : false
        const checkPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        const checkEmail = await users.findOne({where: {email : email}})

        if (!checkRequired){
            res.status(400).json({
                status: 'failed',
                message: "Data tidak lengkap"
            })
        }else if (!password.match(checkPassword)){
            res.status(400).json({
                status: 'failed',
                message: "Password tidak sesuai harap terdapat 1 digit, 1 lowercase , 1 uppercase dan dengan panjang 6-10"
            })
        }else if (checkEmail){
            res.status(400).json({
                status: 'failed',
                message: "Email sudah ada"
            })
        }else{
            const hashPassword = bcrypt.hashSync(password, 10)
            const newUser = await users.create({
                email,
                password : hashPassword,
            })
            res.status(201).json({
                status: 'success',
                data: {
                    users: newUser
                }
            })
        }
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
}


async function login(req,res) {
    try {
        const { email, password } = req.body

        const userFind = await users.findOne({
            where: {
                email
            }
        })


        if (!userFind){
            res.status(404).json({
                status : 'failed',
                message : `user ${email} gak ketemu`
            })
        }

        if(userFind && bcrypt.compareSync(password, userFind.password)){

            const token = jwt.sign({
                id: userFind.id,
                email:userFind.email,
            }, 'aw')
            res.status(201).json({
                status: 'success',
                data: {
                    userFind,
                    token
                }
            })
        }
        
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
}


module.exports = {
    register,
    login
}