import * as React from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import { Button, Menu } from 'react-native-paper';

const DateMenu = ({ onClickHandler }) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View
      style={{
        paddingTop: 50,
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Button onPress={openMenu}>Now</Button>}>
        <Menu.Item
          onPress={() => {
            onClickHandler(true);
            closeMenu();
          }}
          title="Now"
        />
        <Menu.Item
          onPress={() => {
            onClickHandler(false);
            closeMenu();
          }}
          title="Custom"
        />
      </Menu>
    </View>
  );
};

export default DateMenu;
