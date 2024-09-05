import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Dialog, Portal, Text } from 'react-native-paper';

const DialogAlert = ({ message, acceptHandler, rejectHandler }) => {
  const [visible, setVisible] = useState(true);

  const onAcceptHandler = () => {
    setVisible(false);
    acceptHandler();
  };

  const onRejectHandler = () => {
    setVisible(false);
    rejectHandler();
  };

  return (
    <View>
      <Portal>
        <Dialog visible={visible} onDismiss={onRejectHandler}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">{message}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={onRejectHandler}>Cancel</Button>
            <Button onPress={onAcceptHandler}>Accept</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default DialogAlert;
