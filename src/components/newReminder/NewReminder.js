import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { OCCURANCE } from 'global/constants';
import styles from './NewReminder.style';
import { getHours, getMinutes } from 'global/helpers';
import CustomDropdown from 'components/picker/dropdown/Dropdown';
import DataTime from 'components/picker/datatime/DataTime';

const NewReminder = () => {
  const [occuranceIndex, setOccuranceIndex] = useState(0);
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();

  const onSetOccuranceIndex = () => {
    let index = occuranceIndex;
    index = index + 1 === OCCURANCE.length ? 0 : ++index;
    setOccuranceIndex(index);
  };

  const setTime = (value, type) => {
    type === 'Hour' ? setHours(value) : setMinutes(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nudge Me</Text>
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
        onPress={() => console.log('Pressed')}>
        Press me
      </Button>
    </View>
  );
};

export default NewReminder;
