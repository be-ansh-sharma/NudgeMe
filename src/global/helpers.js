import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import notifee, { TriggerType } from '@notifee/react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

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

export const resumeNotifications = async reminder => {
  let quiteDateFrom = dayjs(reminder.quiteDateFrom);
  let quiteDateTo = dayjs(reminder.quiteDateTo);
  let currentDate = dayjs().startOf('day');

  // set to quite date to today's date
  quiteDateFrom = currentDate
    .add(quiteDateFrom.hour(), 'hours')
    .add(quiteDateFrom.minute(), 'minutes');

  quiteDateTo = currentDate
    .add(quiteDateTo.hour(), 'hours')
    .add(quiteDateTo.minute(), 'minutes');

  return await getAllUpcomingReminders(
    reminder.hours,
    reminder.minutes,
    reminder.message,
    dayjs(reminder.fromDate),
    reminder.toDate === 10 ? reminder.toDate : dayjs(reminder.toDate),
    quiteDateFrom,
    quiteDateTo,
    reminder.uid,
    reminder.timezone,
    reminder.uuid,
  );
};

export const getAllUpcomingReminders = async (
  hours,
  minutes,
  message,
  fromDate,
  toDate,
  quiteDateFrom,
  quiteDateTo,
  uid,
  timezone,
  uuid,
) => {
  const reminderRef = uuid || uuidv4();
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
    let notificationID = await setTimedNotification(
      message,
      currTime.valueOf(),
      uid,
      reminderRef,
    );
    upcomingReminders[currTime.valueOf()] = {
      notified: false,
      timestamp: currTime.valueOf(),
      notificationID,
    };
  }
  return {
    upcomingReminders,
    message,
    hours,
    timezone: timezone || dayjs.tz.guess(),
    minutes,
    status: 'ACTIVE',
    intervalMinutes,
    fromDate: fromDate.valueOf(),
    toDate: toDate != 10 ? toDate.valueOf() : toDate,
    quiteDateFrom: quiteDateFrom.valueOf(),
    quiteDateTo: quiteDateTo.valueOf(),
    uuid: reminderRef,
    uid,
  };
};

export const deleteNotifications = async list => {
  try {
    await Promise.all(list.map(rid => notifee.cancelNotification(rid)));
  } catch (err) {
    console.log(err);
  }
};

export const setTimedNotification = async (message, time, uid, refId) => {
  try {
    return await notifee.createTriggerNotification(
      {
        title: 'Nudge',
        body: message,
        data: {
          uid,
          time,
          reminderRef: refId,
        },
        android: {
          channelId: 'reminders',
        },
      },
      {
        type: TriggerType.TIMESTAMP,
        //timestamp: dayjs().add(2, 'minute').valueOf(),
        timestamp: time,
      },
    );
  } catch (err) {
    console.log(err);
  }
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
