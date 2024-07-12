import React from 'react';
import { setToStorage } from 'global/helpers';
import { NavigationContainer } from '@react-navigation/native';
import { HomeNavigation } from 'navigations/AppNavigation';

const App = () => {
  setToStorage('test', 'efe');
  return (
    <NavigationContainer>
      <HomeNavigation />
    </NavigationContainer>
  );
};

export default App;
