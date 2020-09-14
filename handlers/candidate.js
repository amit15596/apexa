import orm from "../sequelize"

const getCandidates = async () => {
    const candidates = await orm.Candidate.findAll({
        include: [
            { model: orm.CandidateTrainingCert },
            { model: orm.CandidateWorkHistory },
        ],
    }).catch((ex) => {
        throw ex
    })
    return candidates
}

const getCandidatesFiltered = async () => {
    const candidates = await orm.Candidate.findAll({
        where: {
            isActive: true,
        },
        include: [
            { model: orm.CandidateTrainingCert },
            { model: orm.CandidateWorkHistory },
        ],
    }).catch((ex) => {
        throw ex
    })
    return candidates
}

const getCandidateById = async (id) => {
    const candidate = await orm.Candidate.findOne({
        where: {
            id,
        },
        include: [
            { model: orm.CandidateTrainingCert },
            { model: orm.CandidateWorkHistory },
        ],
    }).catch((ex) => {
        throw ex
    })
    return candidate
}

const createCandidate = async ({
    firstName,
    middleName = "",
    lastName = "",
    birthDate = null,
    gender = "",
    pa_address1 = "",
    pa_address2 = "",
    pa_city = "",
    pa_state = "",
    pa_country = "",
    pa_zip = "",
    ca_address1 = "",
    ca_address2 = "",
    ca_city = "",
    ca_state = "",
    ca_country = "",
    ca_zip = "",
    email1 = "",
    email2 = "",
    contactNo1,
    contactNo2 = "",
    aadharNo = "",
    isActive = true,
}) => {
    let result = await orm.sequelize
        .transaction(async (t) => {
            const candidateCreated = await orm.Candidate.create(
                {
                    firstName,
                    middleName,
                    lastName,
                    birthDate,
                    gender,
                    pa_address1,
                    pa_address2,
                    pa_city,
                    pa_state,
                    pa_country,
                    pa_zip,
                    ca_address1,
                    ca_address2,
                    ca_city,
                    ca_state,
                    ca_country,
                    ca_zip,
                    email1,
                    email2,
                    contactNo1,
                    contactNo2,
                    aadharNo,
                    isActive,
                },
                { transaction: t }
            )
            return candidateCreated.id
        })
        .catch((err) => {
            throw err
        })
    let res = await getCandidateById(result)
    return res
}

const updateCandidateById = async ({
    id,
    firstName,
    middleName,
    lastName,
    birthDate,
    gender,
    pa_address1,
    pa_address2,
    pa_city,
    pa_state,
    pa_country,
    pa_zip,
    ca_address1,
    ca_address2,
    ca_city,
    ca_state,
    ca_country,
    ca_zip,
    email1,
    email2,
    contactNo1,
    contactNo2,
    aadharNo,
    isActive,
}) => {
    let candidate = await orm.Candidate.findOne({ where: { id } })
    if (candidate) {
        if (firstName != null) candidate.firstName = firstName
        if (middleName != null) candidate.middleName = middleName
        if (lastName != null) candidate.lastName = lastName
        if (birthDate != null) candidate.birthDate = birthDate
        if (gender != null) candidate.gender = gender
        if (pa_address1 != null) candidate.pa_address1 = pa_address1
        if (pa_address2 != null) candidate.pa_address2 = pa_address2
        if (pa_city != null) candidate.pa_city = pa_city
        if (pa_state != null) candidate.pa_state = pa_state
        if (pa_country != null) candidate.pa_country = pa_country
        if (pa_zip != null) candidate.pa_zip = pa_zip
        if (ca_address1 != null) candidate.ca_address1 = ca_address1
        if (ca_address2 != null) candidate.ca_address2 = ca_address2
        if (ca_city != null) candidate.ca_city = ca_city
        if (ca_state != null) candidate.ca_state = ca_state
        if (ca_country != null) candidate.ca_country = ca_country
        if (ca_zip != null) candidate.ca_zip = ca_zip
        if (email1 != null) candidate.email1 = email1
        if (email2 != null) candidate.email2 = email2
        if (contactNo1 != null) candidate.contactNo1 = contactNo1
        if (contactNo2 != null) candidate.contactNo2 = contactNo2
        if (aadharNo != null) candidate.aadharNo = aadharNo
        if (isActive != null) candidate.isActive = isActive
        candidate = await candidate.save()
        return candidate
    } else throw "Candidate Not Found"
}

const addCandidateTrainingCert = async ({
    type,
    title,
    issueDate = null,
    issuedBy = "",
    description = "",
    skill,
    candidate,
}) => {
    const addedTrainingCert = await orm.CandidateTrainingCert.create({
        type: type ? type : null,
        title: title ? title : null,
        issueDate: issueDate ? issueDate : null,
        issuedBy: issuedBy ? issuedBy : null,
        description: description ? description : null,
        skillId: skill ? skill : null,
        candidateId: candidate ? candidate : null,
    }).catch((ex) => {
        throw ex
    })
    return addedTrainingCert
}

const updateCandidateTrainingCertById = async ({
    id,
    type,
    title,
    issueDate,
    issuedBy,
    description,
    skill,
}) => {
    let cert = await orm.CandidateTrainingCert.findOne({ where: { id } })
    if (cert) {
        if (type != null) cert.type = type
        if (title != null) cert.title = title
        if (issueDate != null) cert.issueDate = issueDate
        if (issuedBy != null) cert.issuedBy = issuedBy
        if (description != null) cert.description = description
        if (skill != null) cert.skillId = skill
        cert = await cert.save()
        return cert
    } else throw "Training/Cert Not Found"
}

const removeCandidateTrainingCert = async ({ id }) => {
    const deletedRows = await orm.CandidateTrainingCert.destroy({
        where: { id },
    }).catch((ex) => {
        throw ex
    })
    return deletedRows
}

const addCandidateWorkHistory = async ({
    startDate,
    endDate,
    description = "",
    candidate,
    skill,
    company,
    isActive = true,
}) => {
    if (company && isNaN(company)) {
        let companyCreated = await orm.CompanyMaster.create({
            companyName: company,
        })
        company = companyCreated.id
    }

    const addedWorkHistory = await orm.CandidateWorkHistory.create({
        startDate: startDate ? startDate : null,
        endDate: endDate ? endDate : null,
        description: description ? description : null,
        candidateId: candidate ? candidate : null,
        skillSetId: skill ? skill : null,
        companyId: company ? company : null,
        isActive,
    }).catch((ex) => {
        throw ex
    })
    return addedWorkHistory
}

const updateCandidateWorkHistoryById = async ({
    id,
    startDate,
    endDate,
    description,
    skill,
    company,
    isActive,
}) => {
    let workHistory = await orm.CandidateWorkHistory.findOne({
        where: {
            id,
        },
    })
    if (workHistory) {
        if (company && isNaN(company)) {
            let companyCreated = await orm.CompanyMaster.create({
                companyName: company,
            })
            company = companyCreated.id
        }
        if (startDate != null) workHistory.startDate = startDate
        if (endDate != null) workHistory.endDate = endDate
        if (description != null) workHistory.description = description
        if (skill != null) workHistory.skillSetId = skill
        if (company != null) workHistory.companyId = company
        if (isActive != null) workHistory.isActive = isActive
        workHistory = await workHistory.save()
        return workHistory
    } else throw "Work history not found"
}

const removeCandidateWorkHistory = async ({ id }) => {
    const deletedRows = await orm.CandidateWorkHistory.destroy({
        where: { id },
    }).catch((ex) => {
        throw ex
    })
    return deletedRows
}

// const updateCandidateWorkHistoryById

export default {
    getCandidates,
    getCandidateById,
    createCandidate,
    updateCandidateById,
    getCandidatesFiltered,
    addCandidateTrainingCert,
    updateCandidateTrainingCertById,
    removeCandidateTrainingCert,
    addCandidateWorkHistory,
    updateCandidateWorkHistoryById,
    removeCandidateWorkHistory,
}
