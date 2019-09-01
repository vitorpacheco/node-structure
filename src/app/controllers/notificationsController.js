import notificationModel from '../schemas/notification';

export const indexNotifications = async (req, res) => {
  const notifications = await notificationModel
    .find({ user: req.userId })
    .sort({ createdAt: 'desc' })
    .limit(20);

  return res.json(notifications);
};

export const updateNotification = async (req, res) => {
  const notification = await notificationModel.findByIdAndUpdate(
    req.params.id,
    { read: true },
    { new: true }
  );

  return res.json(notification);
};

export default { indexNotifications, updateNotification };
