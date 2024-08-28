import React, { useEffect, useState } from 'react';
import {
  checkNotficationChannels,
  checkTimeDifference,
  handleNotificationsCheck,
} from 'global/helpers';
import { NavigationContainer } from '@react-navigation/native';
import { HomeNavigation, AuthNavigation } from 'navigations/AppNavigation';
import Splash from 'components/splash/Splash';
import useReminderStore from 'store/reminder';
import auth from '@react-native-firebase/auth';
import { saveUserToStore } from 'global/services/firestore';
import useMetaStore from 'store/meta';

const App = () => {
  const [isReady, setIsReady] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const setUserToState = useReminderStore(state => state.setUser);
  const setChannel = useMetaStore(state => state.setChannel);

  const authStateChangedHandler = async (user, savedUser) => {
    setUser(user);
    // First time after registration
    if (user && !savedUser) {
      setUserToState(user);
      await saveUserToStore(user);
    } else if (user && savedUser) {
      if (user.uid != savedUser.uid) {
        //clean local state as well
        await saveUserToStore(user);
      }
      if (
        checkTimeDifference(
          user?.metadata?.lastSignInTime,
          savedUser?.metadata?.lastSignInTime,
        )
      ) {
        setUserToState(user);
        await saveUserToStore(user, true);
      }
    }
  };

  const hydrateStores = async () => {
    const storePromises = [];

    storePromises.push(
      new Promise((resolve, reject) => {
        useReminderStore.persist.onFinishHydration(state => {
          auth().onAuthStateChanged(user => {
            authStateChangedHandler(user, state.user)
              .then(() => resolve())
              .catch(error => reject(error));
          });
        });
      }),
    );

    storePromises.push(
      new Promise((resolve, reject) => {
        useMetaStore.persist.onFinishHydration(state => {
          if (!state.meta.channelCreated) {
            checkNotficationChannels().then(() => {
              setChannel(true);
              resolve();
            });
          }
        });
      }),
    );

    return Promise.all(storePromises)
      .then(() => {
        console.log('All stores have finished hydrating');
      })
      .catch(error => {
        console.error('Error during store hydration:', error);
      });
  };

  useEffect(() => {
    Promise.all([hydrateStores()]).then(() => {
      setInitializing(false);
    });
  }, []);

  if (initializing) {
    return <Splash />;
  }

  return (
    <NavigationContainer>
      {user ? <HomeNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default App;
