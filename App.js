import React, { useEffect, useState } from 'react';
import { handleNotificationsCheck } from 'global/helpers';
import { NavigationContainer } from '@react-navigation/native';
import { HomeNavigation } from 'navigations/AppNavigation';
import Splash from 'components/splash/Splash';

const App = () => {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    Promise.all([handleNotificationsCheck()])
      .then(() => {
        setIsReady(true);
      })
      .catch(() => {
        console.log('something is very wrong here');
      });
  }, []);

  if (!isReady) {
    return <Splash />;
  }
  return (
    <NavigationContainer>
      <HomeNavigation />
    </NavigationContainer>
  );
};

export default App;
