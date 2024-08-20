import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee, {
  AndroidImportance,
  AuthorizationStatus,
  TimeUnit,
  TriggerType,
} from '@notifee/react-native';
import dayjs from 'dayjs';
import { saveToDatabase } from './database/Database.helper';

var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

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

const getInterval = (hours, minutes) => {
  let interval = dayjs().add(hours, 'h');
  interval = interval.add(minutes, 'minutes');
  return interval.diff(dayjs(), 'minutes');
};

export const setReminders = async (occurance, hours, minutes, message) => {
  var id = dayjs().valueOf();
  if (occurance == 'every') {
    let interval = getInterval(hours, minutes);
    const trigger = {
      type: TriggerType.INTERVAL,
      interval: interval,
      timeUnit: TimeUnit.MINUTES,
    };
    await notifee.createTriggerNotification(
      {
        id: id.toString(),
        title: 'Nudge Nudge',
        body: message,
        android: {
          channelId: 'default',
        },
      },
      trigger,
    );
  } else {
  }
  saveToDatabase(id, occurance, hours, minutes, message);
};
