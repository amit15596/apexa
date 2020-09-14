import express from "express"
import handler from "../handlers"

const router = express.Router()

router.get("/skills", (req, res, next) => {
    handler.skillSet
        .getSkillSets()
        .then((skills) => {
            res.status(200).json(skills)
        })
        .catch((err) => res.status(400).json({ code: 400, error: err }))
})

router.get("/skills/:id", (req, res, next) => {
    handler.skillSet
        .getSkillSetById(req.params.id)
        .then((skill) => {
            res.status(200).json(skill)
        })
        .catch((err) => res.status(400).json({ code: 400, error: err }))
})

router.post("/skills", (req, res, next) => {
    handler.skillSet
        .createSkillSet({ ...req.body })
        .then((skill) => {
            res.status(200).json(skill)
        })
        .catch((err) => res.status(400).json({ code: 400, error: err }))
})

router.put("/skills/:id", (req, res, next) => {
    handler.skillSet
        .updateSkillSetById({ id: req.params.id, ...req.body })
        .then((skill) => res.status(200).json(skill))
        .catch((err) => res.status(400).json({ code: 400, error: err }))
})

export default router
