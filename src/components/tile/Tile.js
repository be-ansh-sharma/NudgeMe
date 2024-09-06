import { COLOR } from 'global/styles';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Menu, ProgressBar, Text } from 'react-native-paper';
import styles from './Tile.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  deleteNotifications,
  getNextReminder,
  resumeNotifications,
} from 'global/helpers';
import dayjs from 'dayjs';
import DialogAlert from 'components/dialogalert/DialogAlert';
import {
  deleteReminderFromRemote,
  updateReminderDocument,
} from 'global/services/firestore';
import useReminderStore from 'store/reminder';
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const Tile = ({ reminder }) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const [min, setMin] = useState();
  const [progress, setProgress] = useState(0);
  const [dialog, setDialog] = useState({
    show: false,
    accept: null,
    reject: null,
    message: '',
  });
  const user = useReminderStore(state => state.user);
  const deleteReminderFromLocal = useReminderStore(
    state => state.deleteReminder,
  );
  const pauseReminderInLocal = useReminderStore(state => state.pauseReminder);
  const resumeReminderInLocal = useReminderStore(state => state.resumeReminder);
  const reminderStatus = reminder.status;
  const isReminderExpired =
    reminder.toDate != 10 &&
    reminder.toDate > dayjs(reminder.fromDate).valueOf();

  const updateTimer =
    reminderStatus === 'ACTIVE'
      ? () => {
          let nextReminder = getNextReminder(reminder);
          let currentProgress = Math.abs(nextReminder.diff(dayjs(), 'm'));
          let intervalMinutes = reminder.intervalMinutes;

          setMin(dayjs().to(nextReminder));
          if (intervalMinutes > currentProgress) {
            setProgress((intervalMinutes - currentProgress) / intervalMinutes);
          }
        }
      : undefined;

  const deleteReminder = async () => {
    setDialog({
      show: false,
    });
    await deleteReminderFromRemote(user.uid, reminder.uuid);
    deleteReminderFromLocal(reminder.uuid);
  };

  const pauseReminder =
    reminderStatus === 'ACTIVE'
      ? async () => {
          let upcomingReminders = reminder.upcomingReminders;
          let upcomingNotifications = Object.keys(upcomingReminders).map(
            rid => upcomingReminders[rid].notificationID,
          );
          await deleteNotifications(upcomingNotifications);
          await updateReminderDocument(user.uid, reminder.uuid, {
            status: 'PAUSED',
            upcomingReminders: null,
          });

          pauseReminderInLocal(reminder.uuid);
        }
      : undefined;

  const resumeReminder =
    reminderStatus === 'PAUSED'
      ? async () => {
          let hasEnoughDiff =
            reminder.toDate == 10
              ? true
              : reminder.toDate >
                dayjs(reminder.fromDate)
                  .add(3 * reminder.intervalMinutes, 'm')
                  .valueOf();

          if (!hasEnoughDiff) {
            setDialog({
              show: true,
              accept: () => {
                setDialog({
                  show: false,
                });
              },
              reject: () => {
                setDialog({
                  show: false,
                });
              },
              message:
                'Reminder is about to expire. Please edit or create a new one',
            });
            return;
          }
          let updatedReminder = await resumeNotifications(reminder);
          await updateReminderDocument(
            user.uid,
            reminder.uuid,
            updatedReminder,
          );
          resumeReminderInLocal(reminder.uuid);
        }
      : undefined;

  useEffect(() => {
    let interval;
    if (reminderStatus === 'ACTIVE') {
      updateTimer();
      interval = setInterval(updateTimer, 60000);
    }

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View key={reminder.uuid} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.message}>{reminder.message}</Text>
        {reminderStatus === 'ACTIVE' ? (
          <>
            <Text style={styles.next}>Nudging you {min}</Text>
            <ProgressBar progress={progress} color={COLOR.primary} />
          </>
        ) : (
          <>{isReminderExpired ? <Text>Expired</Text> : <Text>Paused</Text>}</>
        )}
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
          <Menu.Item
            disabled={isReminderExpired}
            onPress={() => {
              reminderStatus === 'ACTIVE' ? pauseReminder() : resumeReminder();
            }}
            title={reminderStatus === 'ACTIVE' ? 'Pause' : 'Start'}
          />
          <Menu.Item
            titleStyle={{ color: 'red' }}
            onPress={() => {
              closeMenu();
              setDialog({
                show: true,
                accept: deleteReminder,
                reject: () => {
                  setDialog({
                    show: false,
                  });
                },
                message: 'This action is permanent. Are you sure?',
              });
            }}
            title="Delete"
          />
        </Menu>
      </View>
      {!!dialog.show && (
        <DialogAlert
          message={dialog.message}
          acceptHandler={dialog.accept}
          rejectHandler={dialog.reject}
        />
      )}
    </View>
  );
};

export default Tile;
