import auth from '@react-native-firebase/auth';
import AuthForm from 'components/auth/AuthForm';
import Snack from 'components/snackmessage/Snack';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import useReminderStore from 'store/reminder';

const Register = () => {
  const [error, setError] = useState('');
  const setUser = useReminderStore(state => state.setUser);
  const onSubmitHandler = (email, password) => {
    console.log(email, password);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        setUser(user);
      })
      .catch(err => {
        if (err.code === 'auth/email-already-in-use') {
          setError('That email address is already in use!');
          return;
        }

        if (err.code === 'auth/invalid-email') {
          setError('That email address is invalid!');
          return;
        }

        setError(err.code);
      });
  };
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

export default Register;
