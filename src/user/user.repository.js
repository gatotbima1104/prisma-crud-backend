const prisma = require('../db')

const createUser = async (name, password) => {
    const findUser = await prisma.user.findUnique({
        where: {
            name,
        }
    })

    if(findUser){
        return res.send({
            message: "username sudah terdaftar"
        })
    }

    const hashedPassword = bcrypt.hashSync(password, 10)

    await prisma.user.create({
       data: {
        name,
        password: hashedPassword
       },
       
    })
    prisma

    res.send('user created')
}

const userLogin = async (name, password) => {
    const findUser = await prisma.user.findUnique({
        where: {
          name,
        },
      });
    
      if (!findUser) {
        return res.send({
            message: "username not found"
        })
      }
    
      const isValidPassword = bcrypt.compareSync(password, findUser.password);
    
      if (!isValidPassword) {
        return res.send({
            message: "password salah"
        })
      }
    
      res.send({
        message: "login success",
        data: findUser,
      });
}

module.exports = {
    createUser
}