import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Snackbar } from 'react-native-paper';

const Snack = ({ message, messageHandler }) => {
  const [visible, setVisible] = useState(true);
  const onDismiss = () => {
    messageHandler('');
    setVisible(false);
  };
  return (
    <View style={styles.container}>
      <Snackbar
        visible={visible}
        duration={2000}
        onDismiss={onDismiss}
        action={{
          label: 'Undo',
          onPress: () => {
            // Do something
          },
        }}>
        {message}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default Snack;
