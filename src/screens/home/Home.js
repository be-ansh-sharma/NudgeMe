import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import AddNewReminderFAB from 'components/addNewReminderFAB/AddNewReminderFAB';
import messaging from '@react-native-firebase/messaging';
import useReminderStore from 'store/reminder';
import { getRemindersForUser, updateDocument } from 'global/services/firestore';
import Loading from 'components/loading/Loading';
import ActiveReminders from 'components/activereminders/ActiveReminders';

const Home = () => {
  const user = useReminderStore(state => state.user);
  const [isReady, setIsReady] = useState(false);
  const setToken = useReminderStore(state => state.setToken);
  const setReminderToStore = useReminderStore(
    state => state.setReminderToStore,
  );
  const reminders = useReminderStore(state => state.reminders);
  const [permission, setPermission] = useState();

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    setPermission(enabled);
  };

  const checkFCM = async () => {
    if (user) {
      const token = await messaging().getToken();
      console.log(token);
      if (token != user.token) {
        console.log('updaing token');
        await updateDocument('users', user.uid, {
          token,
        });
        setToken(token);
      }
    }
  };

  const getReminders = async () => {
    if (user) {
      let reminders = await getRemindersForUser(user.uid);
      setReminderToStore(reminders);
    }
  };

  useEffect(() => {
    Promise.all(requestUserPermission(), checkFCM(), getReminders()).then(
      () => {
        setIsReady(true);
      },
    );
  }, [user]);

  if (!isReady) {
    return <Loading />;
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      showsHorizontalScrollIndicator={false}>
      {!permission && <Text>uh oh</Text>}
      {Object.keys(reminders).length && (
        <ActiveReminders reminders={reminders} />
      )}
      <AddNewReminderFAB />
    </ScrollView>
  );
};

export default Home;
