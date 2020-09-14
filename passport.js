import bcrypt from "bcrypt"
import passport from "passport"
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt"
import { Strategy as LocalStrategy } from "passport-local"
import crypto from "crypto"
import orm from "./sequelize"
const BCRYPT_SALT_ROUNDS = process.env.BCRYPT_ROUNDS
// Register
passport.use(
    "register",
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            session: false,
        },
        async (email, password, done) => {
            let result = await orm.sequelize
                .transaction(async (t) => {
                    let user = await orm.MSEUser.findOne({
                        where: { mseEmail: email },
                        attributes: [
                            "id",
                            "mseEmail",
                            "firstName",
                            "lastName",
                            "role",
                            "isActive",
                        ],
                    })
                    if (!!user)
                        done(null, false, { message: "Email already exist" })
                    else {
                        const hashedPassword = await bcrypt.hash(
                            password,
                            parseInt(BCRYPT_SALT_ROUNDS)
                        )
                        let userCreated = await orm.MSEUser.create(
                            {
                                mseEmail: email,
                                passwordHash: hashedPassword,
                                isVerified: false,
                            },
                            { transaction: t }
                        )
                        let token = crypto.randomBytes(16).toString("hex")
                        await orm.Token.create(
                            { userId: userCreated.id, token },
                            { transaction: t }
                        )
                        return userCreated
                    }
                })
                .catch((err) => {
                    done(err)
                })
            done(null, result)
            try {
            } catch (error) {
                done(error)
            }
        }
    )
)

// Login
passport.use(
    "login",
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            session: false,
        },
        async (email, password, done) => {
            try {
                let user = await orm.MSEUser.findOne({
                    where: { mseEmail: email },
                    attributes: [
                        "id",
                        "mseEmail",
                        "passwordHash",
                        "firstName",
                        "lastName",
                        "role",
                        "isActive",
                        "isVerified",
                    ],
                })
                if (!user) done(null, false, { message: "Email not found" })
                else {
                    if (user.isVerified) {
                        const isVerified = await bcrypt.compare(
                            password,
                            user.passwordHash
                        )
                        if (isVerified) {
                            const {
                                passwordHash,
                                ...userWithoutHash
                            } = user.toJSON()
                            done(null, userWithoutHash)
                        } else {
                            done(null, false, {
                                message: "Password does not match",
                            })
                        }
                    } else {
                        done(null, false, {
                            message: "User is not verified",
                        })
                    }
                }
            } catch (error) {
                done(error)
            }
        }
    )
)

// JWT for all authenticated route
passport.use(
    "jwt",
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET_KEY,
        },
        async (jwtPayload, done) => {
            let user = await orm.user
                .findOne({ where: { id: jwtPayload.id } })
                .catch((err) => done(err))
            if (!user) {
                done(null, false, { message: "Authorization failed" })
            } else {
                done(null, user)
            }
        }
    )
)
