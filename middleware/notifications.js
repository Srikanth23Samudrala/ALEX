const Notifications = require('../models/notifications')

module.exports.sendNotification = async (userId,channel,message, notificationTitle,mode) => {
    const notificationDetails = new Notifications({
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