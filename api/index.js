import express from "express"
import handler from "../handlers"
import passport from "passport"
import mjml from "mjml"
import jwt from "jsonwebtoken"
import multer from "multer"
import fs from "fs"
import path from "path"
import { check, validationResult } from "express-validator"
import mailer from "../nodemailer"

import permission from './permission';
import skills from './skillSet';
import role from './role';

require("../passport")
const router = express.Router()

// configure storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // file will be saved at
        let p = `uploads/uuid`
        if (file.fieldname.includes("others")) p += `/others`
        if (!fs.existsSync(p)) fs.mkdirSync(p)
        cb(null, p)
    },
    filename: (req, file, cb) => {
        const newFilename = `${file.fieldname}${path.extname(
            file.originalname
        )}`
        cb(null, newFilename)
    },
})

const upload = multer({ storage })

router.use(passport.initialize())
router.all("/", (req, res, next) => {
    res.status(200).send("Api working perfectly")
})

router.use(permission);
router.use(skills);
router.use(role);
// Permission
// router.get("/permissions", (req, res, next) => {
//     handler.permission
//         .getPermissions()
//         .then((permissions) => {
//             res.status(200).json(permissions)
//         })
//         .catch((err) => res.status(400).json({ code: 400, error: err }))
// })

// router.get("/permissions/:id", (req, res, next) => {
//     handler.permission
//         .getPermissionById(req.params.id)
//         .then((permission) => {
//             res.status(200).json(permission)
//         })
//         .catch((err) => res.status(400).json({ code: 400, error: err }))
// })

// router.post("/permissions", (req, res, next) => {
//     handler.permission
//         .createPermission({ ...req.body })
//         .then((permission) => {
//             res.status(200).json(permission)
//         })
//         .catch((err) => res.status(400).json({ code: 400, error: err }))
// })

// router.put("/permissions/:id", (req, res, next) => {
//     handler.permission
//         .updatePermissionById({ id: req.params.id, ...req.body })
//         .then((permission) => res.status(200).json(permission))
//         .catch((err) => res.status(400).json({ code: 400, error: err }))
// })

// SkillSet
// router.get("/skills", (req, res, next) => {
//     handler.skillSet
//         .getSkillSets()
//         .then((skills) => {
//             res.status(200).json(skills)
//         })
//         .catch((err) => res.status(400).json({ code: 400, error: err }))
// })

// router.get("/skills/:id", (req, res, next) => {
//     handler.skillSet
//         .getSkillSetById(req.params.id)
//         .then((skill) => {
//             res.status(200).json(skill)
//         })
//         .catch((err) => res.status(400).json({ code: 400, error: err }))
// })

// router.post("/skills", (req, res, next) => {
//     handler.skillSet
//         .createSkillSet({ ...req.body })
//         .then((skill) => {
//             res.status(200).json(skill)
//         })
//         .catch((err) => res.status(400).json({ code: 400, error: err }))
// })

// router.put("/skills/:id", (req, res, next) => {
//     handler.skillSet
//         .updateSkillSetById({ id: req.params.id, ...req.body })
//         .then((skill) => res.status(200).json(skill))
//         .catch((err) => res.status(400).json({ code: 400, error: err }))
// })

// Role
// router.get("/roles", (req, res, next) => {
//     handler.role
//         .getRoles()
//         .then((roles) => {
//             res.status(200).json(roles)
//         })
//         .catch((err) => res.status(400).json({ code: 400, error: err }))
// })

// router.get("/roles/:id", (req, res, next) => {
//     handler.role
//         .getRoleById(req.params.id)
//         .then((role) => {
//             res.status(200).json(role)
//         })
//         .catch((err) => res.status(400).json({ code: 400, error: err }))
// })

// router.post("/roles", (req, res, next) => {
//     handler.role
//         .createRole({ ...req.body })
//         .then((role) => {
//             res.status(200).json(role)
//         })
//         .catch((err) => res.status(400).json({ code: 400, error: err }))
// })

// router.put("/roles/:id", (req, res, next) => {
//     handler.role
//         .updateRoleById({ id: req.params.id, ...req.body })
//         .then((role) => res.status(200).json(role))
//         .catch((err) => res.status(400).json({ code: 400, error: err }))
// })

// Candidate
router.get("/candidates", (req, res, next) => {
    handler.candidate
        .getCandidates()
        .then((candidates) => {
            res.status(200).json(candidates)
        })
        .catch((err) => res.status(400).json({ code: 400, error: err }))
})

router.put("/candidates/:id", (req, res, next) => {
    handler.candidate
        .updateCandidateById({ id: req.params.id, ...req.body })
        .then((candidate) => {
            res.status(200).json(candidate)
        })
        .catch((err) => res.status(400).json({ code: 400, error: err }))
})

router.get("/candidates/:id", (req, res, next) => {
    handler.candidate
        .getCandidateById(req.params.id)
        .then((candidate) => {
            res.status(200).json(candidate)
        })
        .catch((err) => res.status(400).json({ code: 400, error: err }))
})

router.post("/candidates", (req, res, next) => {
    // console.log(req.body)
    handler.candidate
        .createCandidate({ ...req.body })
        .then((candidate) => res.status(200).json(candidate))
        .catch((err) => res.status(400).json({ code: 400, error: err }))
})

router.post("/candidates/:id/training-cert", (req, res, next) => {
    handler.candidate
        .addCandidateTrainingCert({
            ...req.body,
            candidate: req.params.id,
        })
        .then((cert) => res.status(200).json(cert))
        .catch((err) => res.status(400).json({ code: 400, error: err }))
})

router.put("/candidates/:id/training-cert/:certId", (req, res, next) => {
    handler.candidate
        .updateCandidateTrainingCertById({ id: req.params.certId, ...req.body })
        .then((cert) => res.status(200).json(cert))
        .catch((err) => res.status(400).json({ code: 400, error: err }))
})

router.delete("/candidates/:id/training-cert/:certId", (req, res, next) => {
    handler.candidate
        .removeCandidateTrainingCert({ id: req.params.certId })
        .then((deletedRows) => res.status(200).json(deletedRows))
        .catch((err) => res.status(400).json({ code: 400, error: err }))
})

router.post("/candidates/:id/work-history", (req, res, next) => {
    handler.candidate
        .addCandidateWorkHistory({
            ...req.body,
            candidate: req.params.id,
        })
        .then((workHistory) => res.status(200).json(workHistory))
        .catch((err) => res.status(400).json({ code: 400, error: err }))
})

router.put("/candidates/:id/work-history/:workId", (req, res, next) => {
    handler.candidate
        .updateCandidateWorkHistoryById({ id: req.params.workId, ...req.body })
        .then((updatedWorkHistory) => res.status(200).json(updatedWorkHistory))
        .catch((err) => res.status(400).json({ code: 400, error: err }))
})

router.delete("/candidates/:id/work-history/:workId", (req, res, next) => {
    handler.candidate
        .removeCandidateWorkHistory({ id: req.params.workId })
        .then((deletedRows) => res.status(200).json(deletedRows))
        .catch((err) => res.status(400).json({ code: 400, error: err }))
})

// Industry
router.get("/industries", (req, res, next) => {
    handler.industry
        .getIndustries()
        .then((industries) => {
            res.status(200).json(industries)
        })
        .catch((err) => res.status(400).json({ code: 400, error: err }))
})

router.get("/industries/:id", (req, res, next) => {
    handler.industry
        .getIndustryById(req.params.id)
        .then((industry) => {
            res.status(200).json(industry)
        })
        .catch((err) => res.status(400).json({ code: 400, error: err }))
})

router.post("/industries", (req, res, next) => {
    handler.industry
        .createIndustry({ ...req.body })
        .then((industry) => {
            res.status(200).json(industry)
        })
        .catch((err) => res.status(400).json({ code: 400, error: err }))
})

router.put("/industries/:id", (req, res, next) => {
    handler.industry
        .updateIndustryById({ id: req.params.id, ...req.body })
        .then((industry) => res.status(200).json(industry))
        .catch((err) => res.status(400).json({ code: 400, error: err }))
})

//User
router.post("/register", (req, res, next) => {
    passport.authenticate(
        "register",
        { session: false },
        async (err, user, info) => {
            if (err) res.status(400).json({ message: err })
            if (!user) res.status(400).send({ message: info.message })
            if (!!user) {
                const { firstName, lastName, email } = req.body
                let user = await user.update({
                    firstName: firstName ? firstName : null,
                    lastName: lastName ? lastName : null,
                })
                let token = await handler.token.getTokenForUserId(user.id)
                let html = mjml(
                    handler.mjml.generateRegistrationEmail(
                        user.firstName,
                        user.lastName,
                        token,
                        email
                    ),
                    { beautify: true }
                )
                mailer
                    .sendMail({
                        to: [email],
                        from: '"Apexa Ground Zero" <no-reply@apexa.in>',
                        subject: "Confirm Your Registration",
                        html: html.html,
                    })
                    .then((success) => console.log({ success }))
                    .catch((err) => console.log({ err }))

                res.status(201)
                    .json({
                        message: "User created successfully",
                        user,
                    })
                    .end()
            }
        }
    )(req, res, next)
})

router.post("/login", (req, res, next) => {
    passport.authenticate("login", { session: false }, (err, user, info) => {
        if (err) {
            res.status(400).send({ message: err })
        } else if (!user) {
            res.status(400).send({ message: info.message })
        } else if (!!user) {
            req.login(user.id, (err) => {
                const token = jwt.sign(
                    { id: user.id },
                    process.env.JWT_SECRET_KEY,
                    {
                        expiresIn: "8h",
                    }
                )
                res.status(201).send({
                    auth: true,
                    token,
                    user,
                    message: "User logged in successfully",
                })
            })
        }
    })(req, res, next)
})

router.post("/resend", async (req, res, next) => {
    let user = await orm.MSEUser.findOne({
        where: { mseEmail: req.body.email },
    }).catch((err) => res.status(400).json(err))
    if (!user)
        return res.status(400).json({
            message: "We were unable to find a user with that email.",
        })
    if (user.isVerified)
        return res.status(400).json({
            message: "This account has already been verified. Please log in.",
        })
    let token = await handler.token.createTokenForUserId(user.id)
    let html = mjml(
        handler.mjml.generateRegistrationEmail(
            user.firstName,
            user.lastName,
            token,
            req.body.email
        ),
        { beautify: true }
    )
    mailer
        .sendMail({
            to: [email],
            from: '"Apexa Ground Zero" <no-reply@apexa.in>',
            subject: "Confirm Your Registration",
            html: html.html,
        })
        .then((success) => console.log({ success }))
        .catch((err) => console.log({ err }))
    res.status(200).json({
        message: `A verification email has been sent to ${req.body.email}`,
    })
})

router.post("/confirmation", async (req, res, next) => {
    try {
        const { email, token } = req.body
        if (!email)
            return res.status(400).json({ message: "Email is invalid." })
        if (!token)
            return res.status(400).json({ message: "Token can't be blank." })
        let tokenFound = await handler.token.getUserIdFromToken(token)
        if (!tokenFound)
            return res.status(400).json({
                message: "Token is Invalid. Can't verify this token.",
            })
        let user = await handler.user.getUserByEmailAndId(
            email,
            tokenFound.userId
        )
        if (!user)
            return res.status(400).json({
                message: "We were unable to find a user for this token.",
            })
        if (user.isVerified)
            return res.status(400).json({
                type: "already-verified",
                message: "This user has already been verified.",
            })
        user.isVerified = true
        let updatedUser = await user.save()
        res.status(200).json({
            user: updatedUser,
            message: "The account has been verified. Please log in.",
        })
    } catch (error) {
        res.status(400).json(error)
    }
})

// Subscription
router.get("/subscriptions", (req, res, next) => {
    handler.subscription
        .getSubscriptions()
        .then((subscriptions) => {
            res.status(200).json(subscriptions)
        })
        .catch((err) => res.status(400).json({ code: 400, error: err }))
})

router.get("/subscriptions/:id", (req, res, next) => {
    handler.subscription
        .getSubscriptionById(req.params.id)
        .then((subscription) => {
            res.status(200).json(subscription)
        })
        .catch((err) => res.status(400).json({ code: 400, error: err }))
})

router.post("/subscriptions", (req, res, next) => {
    handler.subscription
        .createSubscription({ ...req.body })
        .then((subscription) => {
            res.status(200).json(subscription)
        })
        .catch((err) => res.status(400).json({ code: 400, error: err }))
})

router.put("/subscriptions/:id", (req, res, next) => {
    handler.subscription
        .updateSubscriptionById({ id: req.params.id, ...req.body })
        .then((subscription) => res.status(200).json(subscription))
        .catch((err) => res.status(400).json({ code: 400, error: err }))
})

// Company
router.get("/companies", (req, res, next) => {
    handler.company
        .getCompanies()
        .then((companies) => {
            res.status(200).json(companies)
        })
        .catch((err) => res.status(400).json({ code: 400, error: err }))
})

router.get("/companies/:id", (req, res, next) => {
    handler.company
        .getCompanyById(req.params.id)
        .then((company) => {
            res.status(200).json(company)
        })
        .catch((err) => res.status(400).json({ code: 400, error: err }))
})

router.post("/companies", (req, res, next) => {
    handler.company
        .createCompany({ ...req.body })
        .then((company) => {
            res.status(200).json(company)
        })
        .catch((err) => {
            console.log(err)
            res.status(400).json({ code: 400, error: err })
        })
})

router.put("/companies/:id", (req, res, next) => {
    handler.company
        .updateCompanyById({ id: req.params.id, ...req.body })
        .then((company) => res.status(200).json(company))
        .catch((err) => res.status(400).json({ code: 400, error: err }))
})

// 404
router.all("*", (req, res, next) => {
    res.status(400).json({
        error: { code: 400, message: "Bad Request - Url not found" },
    })
})

export default router
