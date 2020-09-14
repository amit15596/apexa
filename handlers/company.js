import { Op } from "sequelize"
import orm from "../sequelize"

const getCompanies = async () => {
    const companies = await orm.CompanyMaster.findAll({
        include: [
            {
                model: orm.IndustryTypeMaster,
            },
        ],
    }).catch((ex) => {
        throw ex
    })
    return companies
}

const getCompanyById = async (id) => {
    const company = await orm.CompanyMaster.findOne({
        where: {
            id,
        },
        include: [
            {
                model: orm.IndustryTypeMaster,
            },
        ],
    }).catch((ex) => {
        throw ex
    })
    return company
}

const updateCompanyById = async ({
    id,
    companyName,
    description,
    isActive,
    industryId,
}) => {
    try {
        let companyFound = await orm.CompanyMaster.findOne({
            where: {
                id: {
                    [Op.eq]: id,
                },
            },
            include: [orm.IndustryTypeMaster],
        })
        if (!companyFound) throw { message: "Company not found" }
        // Update company
        if (companyName != null) companyFound.companyName = companyName
        if (description != null) companyFound.description = description
        if (isActive != null) companyFound.isActive = isActive
        if (industryId != null) companyFound.industryId = industryId

        companyFound = await companyFound.save()
        companyFound = await companyFound.reload()
        return companyFound
    } catch (error) {
        console.log(error)
        throw error
    }
}

const createCompany = async ({
    companyName,
    description,
    isActive,
    industryId,
}) => {
    try {
        if (!companyName) throw "Company Name Is Missing"
        let company = orm.CompanyMaster.build(
            { companyName },
            { include: [{ model: orm.IndustryTypeMaster }] }
        )
        company.description = description
        company.isActive = isActive != null ? isActive : true
        company.industryId = industryId != null ? industryId : null
        company = await company.save()
        company = await company.reload()
        return company
    } catch (error) {
        throw error
    }
}
export default {
    createCompany,
    getCompanies,
    getCompanyById,
    updateCompanyById,
}
