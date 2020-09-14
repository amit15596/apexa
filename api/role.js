import express from "express"
import handler from "../handlers"

const router = express.Router()

router.get("/roles", (req, res, next) => {
    handler.role
        .getRoles()
        .then((roles) => {
            res.status(200).json(roles)
        })
        .catch((err) => res.status(400).json({ code: 400, error: err }))
})

router.get("/roles/:id", (req, res, next) => {
    handler.role
        .getRoleById(req.params.id)
        .then((role) => {
            res.status(200).json(role)
        })
        .catch((err) => res.status(400).json({ code: 400, error: err }))
})

router.post("/roles", (req, res, next) => {
    handler.role
        .createRole({ ...req.body })
        .then((role) => {
            res.status(200).json(role)
        })
        .catch((err) => res.status(400).json({ code: 400, error: err }))
})

router.put("/roles/:id", (req, res, next) => {
    handler.role
        .updateRoleById({ id: req.params.id, ...req.body })
        .then((role) => res.status(200).json(role))
        .catch((err) => res.status(400).json({ code: 400, error: err }))
})

export default router
