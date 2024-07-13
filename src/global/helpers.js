import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee, {
  AndroidImportance,
  AuthorizationStatus,
} from '@notifee/react-native';

export const getFromStorage = async key => {
  try {
    const result = await AsyncStorage.getItem(key);
    return result != null ? JSON.parse(result) : null;
  } catch (err) {
    throw err;
  }
};

export const setToStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    throw err;
  }
};

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (err) {
    throw err;
  }
};

export const handleNotificationsCheck = async () => {
  const settings = await notifee.requestPermission();
  if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
    console.log('Permission settings:', settings);
  } else {
    console.log('User declined permissions');
  }
  await notifee.createChannel({
    id: 'default',
    name: 'Nudge Me',
    lights: true,
    vibration: true,
    importance: AndroidImportance.DEFAULT,
  });
};

export const getMinutes = () => {
  return Array(60)
    .fill()
    .map((_, index) => {
      return {
        label: `${index}`,
        value: `${index}`,
      };
    });
};

export const getHours = () => {
  return Array(12)
    .fill()
    .map((_, index) => {
      return {
        label: `${index}`,
        value: `${index}`,
      };
    });
};

export const setReminders = () => {};
