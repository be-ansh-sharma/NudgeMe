import auth from '@react-native-firebase/auth';
import AuthForm from 'components/auth/AuthForm';
import Snack from 'components/snackmessage/Snack';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import useReminderStore from 'store/reminder';

const Login = () => {
  const [error, setError] = useState('');
  const setUser = useReminderStore(state => state.setUser);
  const onSubmitHandler = (email, password) => {
    console.log(email, password);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        setUser(user);
      })
      .catch(err => {
        if ((err.code = 'auth/invalid-credential')) {
          setError('The Credentials are Incorrect!');
          return;
        }
        setError(err.code);
      });
  };
  console.log('inside', error);
  return (
    <View style={styles.container}>
      <AuthForm onSubmit={onSubmitHandler} />
      {error && <Snack message={error} messageHandler={setError} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Login;
