const Notifications = require('../models/notifications')

module.exports.sendNotification = async (userId, notificationMessage, notificationTitle) => {
    const notificationDetails = new Notifications({
        notificationId,
        userId,
        channel,
        message,
        mode
    })
    // console.log(notificationDetails)
    const notification = await notificationDetails.save()
    if (!notification) {
        return 
    }
    return notification
}