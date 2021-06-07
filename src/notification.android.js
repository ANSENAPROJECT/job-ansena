import PushNotification from 'react-native-push-notification';

const showNotification = (title, message, channelId) => {
  PushNotification.localNotification({
    channelId: channelId, // (required)
    title: title,
    message: message,
  });
};

const handleScheduleNotification = (title, message, channelId) => {
  PushNotification.localNotificationSchedule({
    channelId: channelId, // (required)
    title: title,
    message: message,
    date: new Date(Date.now() + 5 * 1000),
  });
};

const handleCancle = () => {
  PushNotification.cancelAllLocalNotifications();
};

export {handleCancle, showNotification, handleScheduleNotification};
