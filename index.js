import 'react-native-gesture-handler';

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { PaperProvider } from 'react-native-paper';
import notifee, { EventType } from '@notifee/react-native';
import { updateReminder } from 'global/services/firestore';
import { useEffect } from 'react';

notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification, pressAction } = detail;

  // Check if the user pressed the "Mark as read" action
  await updateReminder(
    'users',
    notification.data.uid,
    'reminders',
    notification.data.reminderRef,
    notification.data.time,
  );

  // Remove the notification
  await notifee.cancelNotification(notification.id);
});

const AppStore = () => {
  useEffect(() => {
    return notifee.onForegroundEvent(async ({ type, detail }) => {
      const { notification, pressAction } = detail;

      switch (type) {
        case EventType.DISMISSED:
        case EventType.PRESS:
          await updateReminder(
            'users',
            notification.data.uid,
            'reminders',
            notification.data.reminderRef,
            notification.data.time,
          );
      }
    });
  }, []);
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
};

AppRegistry.registerComponent(appName, () => AppStore);
