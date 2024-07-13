import React from 'react';
import { SafeAreaView } from 'react-native';
import styles from './AddNewReminderFAB.style';

import { AnimatedFAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const AddNewReminderFAB = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <AnimatedFAB
        icon={'plus'}
        label={'Label'}
        extended={false}
        onPress={() => navigation.navigate('NewReminder')}
        visible={true}
        animateFrom={'right'}
        iconMode={'static'}
        style={[styles.fabStyle]}
      />
    </SafeAreaView>
  );
};

export default AddNewReminderFAB;
