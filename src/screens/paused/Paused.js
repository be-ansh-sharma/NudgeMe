import React from 'react';
import { ScrollView } from 'react-native';
import AddNewReminderFAB from 'components/addNewReminderFAB/AddNewReminderFAB';
import useReminderStore from 'store/reminder';
import PausedReminders from 'components/pausedreminders/PausedReminders';

const Paused = () => {
  let reminders = useReminderStore(state => state.reminders);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      showsHorizontalScrollIndicator={false}>
      {!!Object.keys(reminders).length && (
        <PausedReminders reminders={reminders} />
      )}
      <AddNewReminderFAB />
    </ScrollView>
  );
};

export default Paused;
