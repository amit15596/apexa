import express from "express"
import handler from "../handlers"
const router = express.Router()

// Permission
router.get("/permissions", (req, res, next) => {
    handler.permission
        .getPermissions()
        .then((permissions) => {
            res.status(200).json(permissions)
        })
        .catch((err) => res.status(400).json({ code: 400, error: err }))
})

router.get("/permissions/:id", (req, res, next) => {
    handler.permission
        .getPermissionById(req.params.id)
        .then((permission) => {
            res.status(200).json(permission)
        })
        .catch((err) => res.status(400).json({ code: 400, error: err }))
})

router.post("/permissions", (req, res, next) => {
    handler.permission
        .createPermission({ ...req.body })
        .then((permission) => {
            res.status(200).json(permission)
        })
        .catch((err) => res.status(400).json({ code: 400, error: err }))
})

router.put("/permissions/:id", (req, res, next) => {
    handler.permission
        .updatePermissionById({ id: req.params.id, ...req.body })
        .then((permission) => res.status(200).json(permission))
        .catch((err) => res.status(400).json({ code: 400, error: err }))
})

export default router
