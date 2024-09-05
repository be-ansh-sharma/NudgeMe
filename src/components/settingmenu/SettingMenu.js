import React from 'react';
import { View } from 'react-native';
import { Button, Menu } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import { COLOR } from 'global/styles';

const SettingMenu = () => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const logout = () => {
    closeMenu();
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button onPress={openMenu}>
            <Icon name="settings-outline" size={20} color={COLOR.background} />
          </Button>
        }>
        <Menu.Item onPress={() => {}} title="Settings" />
        {/* <Menu.Item onPress={() => {}} title="" /> */}
        <Menu.Item
          titleStyle={{ color: 'red' }}
          onPress={() => {
            logout();
          }}
          title="Log Out"
        />
      </Menu>
    </View>
  );
};

export default SettingMenu;
