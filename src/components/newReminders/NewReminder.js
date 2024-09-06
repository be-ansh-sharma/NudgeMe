import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, HelperText, Text } from 'react-native-paper';
import styles from './NewReminder.style';
import { getAllUpcomingReminders, getHours, getMinutes } from 'global/helpers';
import CustomDropdown from 'components/picker/dropdown/Dropdown';
import DataTime from 'components/picker/datatime/DataTime';
import { TextInput } from 'react-native-paper';
import DateMenu from './menu/DateMenu';
import dayjs from 'dayjs';
import { TimePicker } from 'components/picker/timepicker/TimePicker';
import { addRemindersToUser } from 'global/services/firestore';
import useReminderStore from 'store/reminder';
import { useNavigation } from '@react-navigation/native';

const NewReminder = () => {
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [message, setMessage] = useState();
  const [error, setHasError] = useState(false);
  const [fromNowselect, setFromNowSelect] = useState(true);
  const [toInfSelect, setToInfSelect] = useState(true);
  const [customFromdate, setCustomFromDate] = useState();
  const [customToDate, setCustomToDate] = useState();
  const setReminderToStore = useReminderStore(
    state => state.setReminderToStore,
  );
  const [quiteTimeFrom, setQuiteTimeFrom] = useState(
    dayjs().hour(23).minute(0).toDate(),
  );
  const [quiteTimeTo, setQuiteTimeTo] = useState(
    dayjs().hour(6).minute(0).toDate(),
  );
  const user = useReminderStore(state => state.user);
  const navigation = useNavigation();

  const setTime = (type, value) => {
    type === 'Hour' ? setHours(value) : setMinutes(value);
  };

  const onSubmit = async () => {
    if (!hours) {
      setHasError('Value is missing');
    } else if (!minutes) {
      setHasError('Value is missing');
    } else if (hours == 0 && minutes < 15) {
      setHasError(`Interval can't be less than 15 minutes`);
    } else if (!message) {
      setHasError('Reminder is missing');
    } else if (!toInfSelect && !customToDate) {
      setHasError('Custom Date is not set');
    } else if (!fromNowselect && !customFromdate) {
      setHasError('Custom Date is not set');
    } else {
      setHasError(false);
      let reminders = await getAllUpcomingReminders(
        hours,
        minutes,
        message,
        fromNowselect ? dayjs() : dayjs(customFromdate),
        toInfSelect ? 10 : dayjs(customToDate),
        dayjs(quiteTimeFrom),
        dayjs(quiteTimeTo),
        user.uid,
      );
      await addRemindersToUser('users', user.uid, 'reminders', reminders);
      setReminderToStore(reminders);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nudge Me</Text>
      <Text>to</Text>
      <View style={styles.input}>
        <TextInput
          label="Message"
          style={styles.inputmessage}
          value={message}
          mode="outlined"
          onChangeText={text => setMessage(text)}
        />
      </View>
      <Text>Every</Text>
      <View style={styles.picker}>
        <CustomDropdown label="Hour" options={getHours()} handler={setTime} />
        <CustomDropdown
          label="Minutes"
          options={getMinutes()}
          handler={setTime}
        />
      </View>

      <View style={styles.dates}>
        <Text style={styles.label}>From:</Text>
        <DateMenu onClickHandler={setFromNowSelect} />
        {!fromNowselect && <DataTime dateHandler={setCustomFromDate} />}
      </View>

      <View style={styles.dates}>
        <Text style={styles.label}>To:</Text>
        <DateMenu onClickHandler={setToInfSelect} />
        {!toInfSelect && <DataTime dateHandler={setCustomToDate} />}
      </View>

      <View>
        <Text>Quite Time</Text>
        <View>
          <Text>From:</Text>
          <TimePicker time={quiteTimeFrom} timeHandler={setQuiteTimeFrom} />
        </View>
        <View>
          <Text>To:</Text>
          <TimePicker time={quiteTimeTo} timeHandler={setQuiteTimeTo} />
        </View>
      </View>
      <Button
        icon="alarm-multiple"
        mode="contained-tonal"
        style={styles.submit}
        onPress={() => onSubmit()}>
        Press me
      </Button>
      <HelperText type="error" visible={error}>
        {error}
      </HelperText>
    </View>
  );
};

export default NewReminder;
