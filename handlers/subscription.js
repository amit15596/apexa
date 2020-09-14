import orm from "../sequelize"

const getSubscriptions = async () => {
    const subscriptions = await orm.SubscriptionTypeMaster.findAll().catch(
        (ex) => {
            throw ex
        }
    )
    return subscriptions
}

const getSubscriptionById = async (id) => {
    const subscription = await orm.SubscriptionTypeMaster.findOne({
        where: {
            id,
        },
    }).catch((ex) => {
        throw ex
    })
    return subscription
}

const updateSubscriptionById = async ({
    id,
    title,
    description,
    allowedData,
    price,
    isActive,
}) => {
    try {
        let subscription = await orm.SubscriptionTypeMaster.findOne({
            where: { id },
        })
        subscription.title = title
        subscription.description = description
        subscription.allowedData = allowedData
        subscription.price = price
        subscription.isActive = isActive
        let updatedSubscription = await subscription.save()
        return updatedSubscription
    } catch (error) {
        throw error
    }
}

const createSubscription = async ({
    title,
    description = "",
    allowedData = 10,
    price = 0,
    isActive = true,
}) => {
    let createdSubscription = orm.SubscriptionTypeMaster.create({
        title: title ? title : null,
        description: description ? description : null,
        allowedData: allowedData ? allowedData : null,
        price: price ? price : null,
        isActive,
    }).catch((ex) => {
        throw ex
    })
    return createdSubscription
}
export default {
    createSubscription,
    getSubscriptions,
    getSubscriptionById,
    updateSubscriptionById,
}
