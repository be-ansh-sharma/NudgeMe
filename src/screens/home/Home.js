import React from 'react';
import { ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import AddNewReminderFAB from 'components/addNewReminderFAB/AddNewReminderFAB';

const Home = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      showsHorizontalScrollIndicator={false}>
      <Text>asdassssssswd</Text>
      <AddNewReminderFAB />
    </ScrollView>
  );
};

export default Home;
