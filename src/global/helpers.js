import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AndroidImportance,
  AuthorizationStatus,
  TimeUnit,
  TriggerType,
} from '@notifee/react-native';
import dayjs from 'dayjs';
import { saveToDatabase } from './database/Database.helper';
import notifee from '@notifee/react-native';

var relativeTime = require('dayjs/plugin/relativeTime');
var isBetween = require('dayjs/plugin/isBetween');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(relativeTime);
dayjs.extend(isBetween);
dayjs.extend(timezone);

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

export const checkTimeDifference = (date1, date2) => {
  date1 = dayjs(date1);
  date2 = dayjs(date2);
  return date1.diff(date2, 'd') > 1;
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

export const getNextReminder = reminder => {
  let reminderList = Object.keys(reminder.upcomingReminders);

  const now = dayjs();
  const closestTimestamp = reminderList.reduce((closest, current) => {
    const currentDiff = Math.abs(now.diff(dayjs(Number(current))));
    const closestDiff = Math.abs(now.diff(dayjs(Number(closest))));
    return currentDiff < closestDiff ? current : closest;
  });

  return dayjs(Number(closestTimestamp));
};

export const getAllUpcomingReminders = (
  hours,
  minutes,
  message,
  fromDate,
  toDate,
  quiteDateFrom,
  quiteDateTo,
) => {
  let intervalMinutes = getInterval(hours, minutes);
  let currTime = fromDate;

  if (quiteDateTo.isBefore(quiteDateFrom)) {
    quiteDateTo = quiteDateTo.add(1, 'day');
  }

  let upcomingReminders = {};

  while (Object.keys(upcomingReminders).length <= 5) {
    currTime = currTime.add(intervalMinutes, 'm');
    if (currTime.isAfter(quiteDateTo)) {
      quiteDateFrom = quiteDateFrom.add(1, 'day');
      quiteDateTo = quiteDateTo.add(1, 'day');
    }
    if (currTime.isBetween(quiteDateFrom, quiteDateTo)) {
      currTime = quiteDateTo;
      currTime = currTime.add(minutes, 'm');
    }
    if (toDate !== 10 && currTime.isAfter(toDate)) {
      break;
    }
    upcomingReminders[currTime.valueOf()] = {
      notified: false,
      timestamp: currTime.valueOf(),
    };
  }
  return {
    upcomingReminders,
    message,
    hours,
    timezone: dayjs.tz.guess(),
    minutes,
    status: 'ACTIVE',
    intervalMinutes,
    fromDate: fromDate.valueOf(),
    toDate: toDate != 10 ? toDate.valueOf() : toDate,
    quiteDateFrom: quiteDateFrom.valueOf(),
    quiteDateTo: quiteDateTo.valueOf(),
  };
};

export const checkNotficationChannels = async () => {
  const channelsToCreate = [
    {
      id: 'reminders',
      name: 'Reminders',
      sound: 'reminder_sound',
      vibration: true,
      importance: 4,
    },
  ];
  for (const channel of channelsToCreate) {
    if (!(await channelExists(channel.id))) {
      await notifee.createChannel(channel);
    }
  }
};

async function channelExists(channelId) {
  const channels = await notifee.getChannels();
  return channels.some(channel => channel.id === channelId);
}

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
