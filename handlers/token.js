import crypto from "crypto"
import orm from "../sequelize"
const getTokenForUserId = async (userId) => {
    let token = await orm.Token.findOne({
        where: {
            userId,
        },
    }).catch((err) => {
        throw err
    })
    return token
}
const createTokenForUserId = async (userId) => {
    let token = await orm.Token.create({
        userId,
        token: crypto.randomBytes(16).toString("hex"),
    }).catch((err) => {
        throw err
    })
    return token
}

const getUserIdFromToken = async (token) => {
    let tokenFound = await orm.Token.findOne({
        where: {
            token,
        },
    }).catch((err) => {
        throw err
    })
    return tokenFound
}
export default {
    createTokenForUserId,
    getTokenForUserId,
    getUserIdFromToken,
}
