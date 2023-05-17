const {createUser} = require('./user.repository');

const insertUser = async (name, password) => {
    const user = await createUser(name, password);

    // .. tambah logic disini
    return user 
}


module.exports = {
    insertUser,
}