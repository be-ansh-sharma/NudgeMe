import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import styles from './AddNewReminder.style';

import { AnimatedFAB } from 'react-native-paper';

const AddNewReminder = () => {
  return (
    <SafeAreaView style={styles.container}>
      <AnimatedFAB
        icon={'plus'}
        label={'Label'}
        extended={false}
        onPress={() => console.log('Pressed')}
        visible={true}
        animateFrom={'right'}
        iconMode={'static'}
        style={[styles.fabStyle]}
      />
    </SafeAreaView>
  );
};

export default AddNewReminder;
