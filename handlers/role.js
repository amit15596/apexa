import { Op } from "sequelize"
import orm from "../sequelize"

const getRoles = async () => {
    const roles = await orm.UserRoleMaster.findAll({
        include: [
            {
                model: orm.PermissionMaster,
            },
        ],
    }).catch((ex) => {
        throw ex
    })
    return roles
}

const getRoleById = async (id) => {
    const role = await orm.UserRoleMaster.findOne({
        where: {
            id,
        },
        include: [
            {
                model: orm.RolePermission,
                include: [orm.PermissionMaster],
            },
        ],
    }).catch((ex) => {
        throw ex
    })
    return role
}

const updateRoleById = async ({
    id,
    role,
    description,
    permissions,
    isActive,
}) => {
    let result = await orm.sequelize
        .transaction(async (t) => {
            // Find role if it is there
            let roleFound = await orm.UserRoleMaster.findOne({
                where: {
                    id: {
                        [Op.eq]: id,
                    },
                },
                include: [orm.PermissionMaster],
            })
            if (!roleFound) throw { message: "Role not found" }

            // Update role
            roleFound.roleName = role
            roleFound.roleDescription = description
            roleFound.isActive = isActive
            roleFound = await roleFound.save({ transaction: t })

            // Remove permissions which are no more there in role
            await orm.RolePermission.destroy({
                where: {
                    roleId: roleFound.id,
                    permissionId: {
                        [Op.ne]: permissions,
                    },
                },
                transaction: t,
            })

            roleFound = roleFound.toJSON()
            let newPermissions = permissions.filter(
                (permission) =>
                    !roleFound.permission_masters.includes(permission)
            )

            // Add new permisisons to role
            for (const permission of newPermissions) {
                await orm.RolePermission.create(
                    {
                        roleId: roleFound.id,
                        permissionId: permission,
                        isActive: true,
                    },
                    { transaction: t }
                )
            }

            return roleFound.id
        })
        .catch((err) => {
            throw err
        })
    let res = await getRoleById(result)
    return res
}

const createRole = async ({
    role,
    description = "",
    permissions = [],
    isActive = true,
}) => {
    let result = await orm.sequelize
        .transaction(async (t) => {
            const userRoleCreated = await orm.UserRoleMaster.create(
                {
                    roleName: role ? role : null,
                    roleDescription: description ? description : null,
                    isActive,
                },
                { transaction: t }
            )
            for (const permission of permissions) {
                await orm.RolePermission.create(
                    {
                        roleId: userRoleCreated.id,
                        permissionId: permission,
                        isActive: true,
                    },
                    { transaction: t }
                )
            }
            return userRoleCreated.id
        })
        .catch((err) => {
            throw err
        })
    let res = await getRoleById(result)
    return res
}

export default { getRoles, getRoleById, createRole, updateRoleById }
