import { Sequelize, DataTypes } from "sequelize"

const orm = new Sequelize({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    dialect: "mariadb",
    dialectOptions: {
        connectionTimeout: 1000,
    },
    logging: false,
    define: {
        freezeTableName: true,
        timestamps: false,
    },
})

const Candidate = orm.define("candidate", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    middleName: {
        type: DataTypes.STRING(45),
        allowNull: true,
    },
    lastName: {
        type: DataTypes.STRING(45),
        allowNull: true,
    },
    birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    gender: {
        type: DataTypes.STRING(45),
        allowNull: true,
    },
    pa_address1: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    pa_address2: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    pa_city: {
        type: DataTypes.STRING(45),
        allowNull: true,
    },
    pa_state: {
        type: DataTypes.STRING(45),
        allowNull: true,
    },
    pa_country: {
        type: DataTypes.STRING(45),
        allowNull: true,
    },
    pa_zip: {
        type: DataTypes.STRING(45),
        allowNull: true,
    },
    ca_address1: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    ca_address2: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    ca_city: {
        type: DataTypes.STRING(45),
        allowNull: true,
    },
    ca_state: {
        type: DataTypes.STRING(45),
        allowNull: true,
    },
    ca_country: {
        type: DataTypes.STRING(45),
        allowNull: true,
    },
    ca_zip: {
        type: DataTypes.STRING(45),
        allowNull: true,
    },
    email1: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    email2: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    contactNo1: {
        type: DataTypes.STRING(45),
        allowNull: true,
    },
    contactNo2: {
        type: DataTypes.STRING(45),
        allowNull: true,
    },
    aadharNo: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
    },
})

const SkillSetMaster = orm.define("skill_set_master", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
    },
})

const UserRoleMaster = orm.define("user_role_master", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    roleName: {
        type: DataTypes.STRING(45),
        unique: true,
        allowNull: false,
    },
    roleDescription: {
        type: DataTypes.STRING(45),
        allowNull: true,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
    },
})

const IndustryTypeMaster = orm.define("industry_type_master", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(45),
        unique: true,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
    },
})

const CompanyMaster = orm.define("company_master", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    companyName: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
    },
    industryId: {
        type: DataTypes.INTEGER,
        references: {
            model: IndustryTypeMaster,
            key: "id",
        },
        allowNull: true,
    },
})

const MSEUser = orm.define("mse_user", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: DataTypes.STRING(45),
        allowNull: true,
    },
    lastName: {
        type: DataTypes.STRING(45),
        allowNull: true,
    },
    mseEmail: {
        type: DataTypes.STRING(45),
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    passwordHash: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    gender: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    country: {
        type: DataTypes.STRING(45),
        allowNull: true,
    },
    contactNo: {
        type: DataTypes.STRING(45),
        allowNull: true,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
    },
    role: {
        type: DataTypes.INTEGER,
        references: {
            model: UserRoleMaster,
            key: "id",
        },
        allowNull: true,
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
})

const SubscriptionTypeMaster = orm.define("subscription_type_master", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    allowedData: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 10,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
    },
})

const CandidateCallHistory = orm.define("candidate_call_history", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    contactNo: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    callStartTime: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    candidateId: {
        type: DataTypes.INTEGER,
        references: {
            model: Candidate,
            key: "id",
        },
        allowNull: true,
    },
    calledBy: {
        type: DataTypes.INTEGER,
        references: {
            model: MSEUser,
            key: "id",
        },
        allowNull: false,
    },
})

const CandidateRequest = orm.define("candidate_request", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fullName: {
        type: DataTypes.STRING(45),
        allowNull: true,
    },
    contactNo: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    comment: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    isRegistered: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
    },
})

const CandidateWorkHistory = orm.define("candidate_work_history", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    startDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    endDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    description: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    candidateId: {
        type: DataTypes.INTEGER,
        references: {
            model: Candidate,
            key: "id",
        },
        allowNull: false,
    },
    skillSetId: {
        type: DataTypes.BOOLEAN,
        references: {
            model: SkillSetMaster,
            key: "id",
        },
        allowNull: false,
    },
    companyId: {
        type: DataTypes.INTEGER,
        references: {
            model: CompanyMaster,
            key: "id",
        },
        allowNull: true,
    },
})

const FeatureMaster = orm.define("feature_master", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
    },
})

const IndustrySkillCategory = orm.define("industry_skill_category", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
    },
    industryId: {
        type: DataTypes.INTEGER,
        references: {
            model: IndustryTypeMaster,
            key: "id",
        },
        allowNull: false,
    },
    skillSetId: {
        type: DataTypes.INTEGER,
        references: {
            model: SkillSetMaster,
            key: "id",
        },
        allowNull: false,
    },
})

const PermissionMaster = orm.define("permission_master", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    permission: {
        type: DataTypes.STRING(45),
        unique: true,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(200),
        allowNull: true,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
    },
})

const RolePermission = orm.define("role_permission", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
    },
    permissionId: {
        type: DataTypes.INTEGER,
        references: {
            model: PermissionMaster,
            key: "id",
        },
        allowNull: false,
    },
    roleId: {
        type: DataTypes.INTEGER,
        references: {
            model: UserRoleMaster,
            key: "id",
        },
        allowNull: false,
    },
})

const SubscriptionFeature = orm.define("subscription_feature", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
    },
    featureId: {
        type: DataTypes.INTEGER,
        references: {
            model: FeatureMaster,
            key: "id",
        },
        allowNull: false,
    },
    subscriptionId: {
        type: DataTypes.INTEGER,
        references: {
            model: SubscriptionTypeMaster,
            key: "id",
        },
        allowNull: false,
    },
})

const UserSubscription = orm.define("user_subscription", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    subscriptionId: {
        type: DataTypes.INTEGER,
        references: {
            model: SubscriptionTypeMaster,
            key: "id",
        },
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: MSEUser,
            key: "id",
        },
        allowNull: false,
    },
})

const CandidateKYC = orm.define("candidate_kyc", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    poi_type: { type: DataTypes.STRING(50), allowNull: true },
    poi_no: { type: DataTypes.STRING(50), allowNull: true },
    por_type: { type: DataTypes.STRING(50), allowNull: true },
    por_no: { type: DataTypes.STRING(50), allowNull: true },
    candidateId: {
        type: DataTypes.INTEGER,
        references: {
            model: Candidate,
            key: "id",
        },
        allowNull: false,
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
    },
    verifiedBy: {
        type: DataTypes.INTEGER,
        references: {
            model: MSEUser,
            key: "id",
        },
        allowNull: false,
    },
    verifiedAt: {
        type: DataTypes.DATE,
    },
})

const CandidateTrainingCert = orm.define("candidate_training_cert", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    type: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    issueDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    issuedBy: {
        type: DataTypes.STRING(80),
        allowNull: true,
    },
    description: {
        type: DataTypes.STRING(200),
        allowNull: true,
    },
    candidateId: {
        type: DataTypes.INTEGER,
        references: {
            model: Candidate,
            key: "id",
        },
        allowNull: false,
    },
    skillId: {
        type: DataTypes.INTEGER,
        references: {
            model: SkillSetMaster,
            key: "id",
        },
        allowNull: false,
    },
})

const Token = orm.define("registration_token", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: MSEUser,
            key: "id",
        },
        allowNull: false,
    },
    token: {
        type: DataTypes.STRING(500),
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Date.now,
        allowNull: true,
    },
})

//Relations - Associations
// Role, Permission
RolePermission.belongsTo(UserRoleMaster, { foreignKey: "roleId" })
RolePermission.belongsTo(PermissionMaster, { foreignKey: "permissionId" })
UserRoleMaster.belongsToMany(PermissionMaster, {
    through: RolePermission,
    foreignKey: "roleId",
})
PermissionMaster.belongsToMany(UserRoleMaster, {
    through: RolePermission,
    foreignKey: "permissionId",
})
UserRoleMaster.hasMany(RolePermission, { foreignKey: "roleId" })
PermissionMaster.hasMany(RolePermission, { foreignKey: "permissionId" })
// Industry, SkillSet
IndustrySkillCategory.belongsTo(IndustryTypeMaster, {
    foreignKey: "industryId",
})
IndustrySkillCategory.belongsTo(SkillSetMaster, { foreignKey: "skillSetId" })
IndustryTypeMaster.belongsToMany(SkillSetMaster, {
    through: IndustrySkillCategory,
    foreignKey: "industryId",
})
SkillSetMaster.belongsToMany(IndustryTypeMaster, {
    through: IndustrySkillCategory,
    foreignKey: "skillSetId",
})
IndustryTypeMaster.hasMany(IndustrySkillCategory, { foreignKey: "industryId" })
SkillSetMaster.hasMany(IndustrySkillCategory, { foreignKey: "skillSetId" })
// Candidate, CandidateWorkHistory, CandidateTrainingCert
Candidate.hasMany(CandidateWorkHistory, { foreignKey: "candidateId" })
Candidate.hasMany(CandidateTrainingCert, { foreignKey: "candidateId" })
CandidateWorkHistory.belongsTo(Candidate, { foreignKey: "candidateId" })
CandidateTrainingCert.belongsTo(Candidate, { foreignKey: "candidateId" })
// Company, Industry
IndustryTypeMaster.hasMany(CompanyMaster, { foreignKey: "industryId" })
CompanyMaster.belongsTo(IndustryTypeMaster, { foreignKey: "industryId" })

export default {
    Candidate,
    CandidateCallHistory,
    CandidateRequest,
    CandidateWorkHistory,
    CandidateKYC,
    CandidateTrainingCert,
    CompanyMaster,
    FeatureMaster,
    IndustrySkillCategory,
    IndustryTypeMaster,
    MSEUser,
    PermissionMaster,
    RolePermission,
    sequelize: orm,
    SkillSetMaster,
    SubscriptionFeature,
    SubscriptionTypeMaster,
    Token,
    UserRoleMaster,
    UserSubscription,
}
