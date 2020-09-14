import { Op } from "sequelize"
import orm from "../sequelize"

const getIndustries = async () => {
    const industries = await orm.IndustryTypeMaster.findAll({
        include: [
            {
                model: orm.SkillSetMaster,
            },
        ],
    }).catch((ex) => {
        throw ex
    })
    return industries
}

const getIndustryById = async (id) => {
    const industry = await orm.IndustryTypeMaster.findOne({
        where: {
            id,
        },
        include: [
            {
                model: orm.SkillSetMaster,
            },
        ],
    }).catch((ex) => {
        throw ex
    })
    return industry
}

const updateIndustryById = async ({
    id,
    title,
    description,
    isActive,
    skills,
}) => {
    let result = await orm.sequelize
        .transaction(async (t) => {
            // Find industry if it is there
            let industryFound = await orm.IndustryTypeMaster.findOne({
                where: {
                    id: {
                        [Op.eq]: id,
                    },
                },
                include: [orm.SkillSetMaster],
            })
            if (!industryFound) throw { message: "Industry not found" }
            // Update industry
            industryFound.title = title
            industryFound.description = description
            industryFound.isActive = isActive
            industryFound = await industryFound.save({ transaction: t })

            // Remove skills which are no more there in industry
            await orm.IndustrySkillCategory.destroy({
                where: {
                    industryId: industryFound.id,
                    skillSetId: {
                        [Op.ne]: skills,
                    },
                },
                transaction: t,
            })

            industryFound = industryFound.toJSON()
            let newSkills = skills.filter(
                (skill) => !industryFound.skill_set_masters.includes(skill)
            )

            // Add new skills to industry
            for (const skill of newSkills) {
                await orm.IndustrySkillCategory.create(
                    {
                        industryId: industryFound.id,
                        skillSetId: skill,
                        isActive: true,
                    },
                    { transaction: t }
                )
            }

            return industryFound.id
        })
        .catch((err) => {
            throw err
        })
    let res = await getIndustryById(result)
    return res
}

const createIndustry = async ({
    title,
    description = "",
    isActive = true,
    skills = [],
}) => {
    let result = await orm.sequelize
        .transaction(async (t) => {
            let industryCreated = await orm.IndustryTypeMaster.create(
                {
                    title: title ? title : null,
                    description: description ? description : null,
                    isActive,
                },
                { transaction: t }
            )
            for (const skill of skills) {
                await orm.IndustrySkillCategory.create(
                    {
                        industryId: industryCreated.id,
                        skillSetId: skill,
                        isActive: true,
                    },
                    { transaction: t }
                )
            }
            return industryCreated.id
        })
        .catch((err) => {
            throw err
        })
    let res = await getIndustryById(result)
    return res
}
export default {
    createIndustry,
    getIndustries,
    getIndustryById,
    updateIndustryById,
}
