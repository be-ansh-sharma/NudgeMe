import AddNewReminder from 'components/addNewReminder/AddNewReminder';
import React from 'react';
import { ScrollView, View } from 'react-native';
import styles from './Home.style';
import { Text } from 'react-native-paper';

const Home = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, borderWidth: 1, borderColor: 'red' }}
      contentContainerStyle={{ flexGrow: 1 }}
      showsHorizontalScrollIndicator={false}>
      <Text>asdassssssswd</Text>
      <AddNewReminder />
    </ScrollView>
  );
};

export default Home;
