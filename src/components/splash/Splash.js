import { COLOR } from 'global/styles';
import React from 'react';
import { View, Image, StatusBar } from 'react-native';
import styles from './Splash.style';

const Splash = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.dark} />
      <Image
        source={require('../../assets/images/splash.png')}
        style={styles.splash}
      />
    </View>
  );
};

export default Splash;
