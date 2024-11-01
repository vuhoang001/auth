const notification = require("../models/notification.model")
const { BadRequestError } = require("../core/error.response")

class NotiService {
  GetAll = async () => {
    try {
      const notifications = await Notification.find({})
        .populate({
          path: 'user',
          select: 'username email' // Adjust the fields you want to include from the Account model
        })
        .exec();

      return notifications;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error; // Handle the error as needed
    }

  }
}

module.exports = new NotiService()