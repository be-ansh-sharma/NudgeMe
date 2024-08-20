import React, { useEffect, useState } from 'react';
import { handleNotificationsCheck } from 'global/helpers';
import { NavigationContainer } from '@react-navigation/native';
import { HomeNavigation, AuthNavigation } from 'navigations/AppNavigation';
import Splash from 'components/splash/Splash';
import useReminderStore from 'store/reminder';
import auth from '@react-native-firebase/auth';

const App = () => {
  const [isReady, setIsReady] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  //const setUserInfo = useReminderStore(state => state.setUserInfo);
  //const user = useReminderStore(state => state.user);

  //const getAllReminders = useReminderStore(state => state.getAllReminders);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    // Promise.all([handleNotificationsCheck(), getAllReminders()])
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
    // Promise.all([setUserInfo()])
    //   .then(() => {
    //     setIsReady(true);
    //   })
    //   .catch(() => {
    //     console.log('something is very wrong here');
    //   });
  }, []);

  if (initializing) {
    return <Splash />;
  }
  console.log(user);
  return (
    <NavigationContainer>
      {user ? <HomeNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default App;
