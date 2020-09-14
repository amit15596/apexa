import orm from "../sequelize"

const getSkillSets = async () => {
    const skillSets = await orm.SkillSetMaster.findAll().catch((ex) => {
        throw ex
    })
    return skillSets
}

const getSkillSetById = async (id) => {
    const skillSet = await orm.SkillSetMaster.findOne({
        where: {
            id,
        },
    }).catch((ex) => {
        throw ex
    })
    return skillSet
}

const updateSkillSetById = async ({ id, title, description, isActive }) => {
    try {
        let skill = await orm.SkillSetMaster.findOne({ where: { id } })
        skill.title = title
        skill.description = description
        skill.isActive = isActive
        let updatedSkill = await skill.save()
        return updatedSkill
    } catch (error) {
        throw error
    }
}

const createSkillSet = async ({ title, description = "", isActive = true }) => {
    let createdSkillSet = orm.SkillSetMaster.create({
        title: title ? title : null,
        description: description ? description : null,
        isActive,
    }).catch((ex) => {
        throw ex
    })
    return createdSkillSet
}
export default {
    createSkillSet,
    getSkillSets,
    getSkillSetById,
    updateSkillSetById,
}
