import orm from "../sequelize"

const getUserByEmailAndId = async (email, id) => {
    let user = await orm.MSEUser.findOne({
        where: { mseEmail: email, id },
    }).catch((err) => {
        throw err
    })
    return user
}

export default {
    getUserByEmailAndId,
}
