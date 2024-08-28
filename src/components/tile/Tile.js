import { COLOR } from 'global/styles';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Menu, ProgressBar, Text } from 'react-native-paper';
import styles from './Tile.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getNextReminder } from 'global/helpers';
import dayjs from 'dayjs';
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const Tile = ({ reminder }) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const [min, setMin] = useState();
  const [progress, setProgress] = useState(0);

  const updateTimer = () => {
    let nextReminder = getNextReminder(reminder);
    let currentProgress = Math.abs(nextReminder.diff(dayjs(), 'm'));
    let intervalMinutes = reminder.intervalMinutes;

    setMin(dayjs().to(nextReminder));
    if (intervalMinutes > currentProgress) {
      console.log('rr', currentProgress);
      setProgress((intervalMinutes - currentProgress) / intervalMinutes);
    }
  };

  useEffect(() => {
    updateTimer();
    const interval = setInterval(updateTimer, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View key={reminder.uuid} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.message}>{reminder.message}</Text>
        <Text style={styles.next}>Nudging you {min}</Text>
        <ProgressBar progress={progress} color={COLOR.primary} />
      </View>
      <View style={styles.menu}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Button
              onPress={openMenu}
              style={styles.icon}
              rippleColor="transparent">
              <Icon size={20} name="dots-vertical" />
            </Button>
          }>
          <Menu.Item onPress={() => {}} title="Edit" />
          <Menu.Item onPress={() => {}} title="Pause" />
          <Menu.Item onPress={() => {}} title="Delete" />
        </Menu>
      </View>
    </View>
  );
};

export default Tile;
