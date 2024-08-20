import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Button, HelperText, Text } from 'react-native-paper';
import { OCCURANCE } from 'global/constants';
import styles from './NewReminder.style';
import { getHours, getMinutes, setReminders } from 'global/helpers';
import CustomDropdown from 'components/picker/dropdown/Dropdown';
import DataTime from 'components/picker/datatime/DataTime';
import { TextInput } from 'react-native-paper';

const NewReminder = () => {
  const [occuranceIndex, setOccuranceIndex] = useState(0);
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [message, setMessage] = useState();
  const [error, setHasError] = useState(false);

  const onSetOccuranceIndex = () => {
    let index = occuranceIndex;
    index = index + 1 === OCCURANCE.length ? 0 : ++index;
    setOccuranceIndex(index);
  };

  const setTime = (type, value) => {
    type === 'Hour' ? setHours(value) : setMinutes(value);
  };

  const onSubmit = async () => {
    console.log(hours);
    if (!hours) {
      setHasError('Value is missing');
    } else if (!minutes) {
      setHasError('Value is missing');
    } else if (hours == 0 && minutes < 15) {
      setHasError(`Interval can't be less than 15 minutes`);
    } else if (!message) {
      setHasError('Reminder is missing');
    } else {
      setHasError(false);
      await setReminders(OCCURANCE[occuranceIndex], hours, minutes, message);
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
      <Pressable onPress={onSetOccuranceIndex} style={styles.occurance}>
        <Text style={styles.occuranceText}>{OCCURANCE[occuranceIndex]}</Text>
      </Pressable>
      {OCCURANCE[occuranceIndex] === 'every' && (
        <View style={styles.picker}>
          <CustomDropdown label="Hour" options={getHours()} handler={setTime} />
          <CustomDropdown
            label="Minutes"
            options={getMinutes()}
            handler={setTime}
          />
        </View>
      )}
      {OCCURANCE[occuranceIndex] === 'once' && <DataTime />}
      {OCCURANCE[occuranceIndex] === 'every' && (
        <Text style={styles.label}>From now</Text>
      )}
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
