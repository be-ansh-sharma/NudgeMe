import React, { useState } from 'react';
import { View } from 'react-native';
import styles from './ActiveReminders.style';
import Tile from 'components/tile/Tile';

const ActiveReminders = ({ reminders }) => {
  return (
    <View style={styles.container}>
      {Object.keys(reminders)
        .filter(id => reminders[id].status === 'ACTIVE')
        .map(uuid => {
          let reminder = reminders[uuid];
          return <Tile key={uuid} reminder={reminder} />;
        })}
    </View>
  );
};

export default ActiveReminders;
