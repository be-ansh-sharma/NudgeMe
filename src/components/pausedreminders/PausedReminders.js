import React, { useState } from 'react';
import { View } from 'react-native';
import styles from './PausedReminders.style';
import Tile from 'components/tile/Tile';

const PausedReminders = ({ reminders }) => {
  return (
    <View style={styles.container}>
      {Object.keys(reminders)
        .filter(id => reminders[id].status === 'PAUSED')
        .map(uuid => {
          let reminder = reminders[uuid];
          return <Tile key={uuid} reminder={reminder} />;
        })}
    </View>
  );
};

export default PausedReminders;
