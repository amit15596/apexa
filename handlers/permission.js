import orm from "../sequelize"

const getPermissions = async () => {
    const permissions = await orm.PermissionMaster.findAll().catch((ex) => {
        throw ex
    })
    return permissions
}

const getPermissionById = async (id) => {
    const permission = await orm.PermissionMaster.findOne({
        where: {
            id,
        },
    }).catch((ex) => {
        throw ex
    })
    return permission
}

const updatePermissionById = async ({
    id,
    permission,
    description,
    isActive,
}) => {
    try {
        let permissionFound = await orm.PermissionMaster.findOne({
            where: { id },
        })
        permissionFound.permission = permission
        permissionFound.description = description
        permissionFound.isActive = isActive
        let updatedPermission = await permissionFound.save()
        return updatedPermission
    } catch (error) {
        throw error
    }
}

const createPermission = async ({
    permission,
    description = "",
    isActive = true,
}) => {
    const permissionCreated = await orm.PermissionMaster.create({
        permission: permission ? permission : null,
        description: description ? description : null,
        isActive,
    }).catch((ex) => {
        throw ex
    })
    return permissionCreated
}

export default {
    getPermissions,
    getPermissionById,
    createPermission,
    updatePermissionById,
}
