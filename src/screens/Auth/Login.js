import auth from '@react-native-firebase/auth';
import AuthForm from 'components/auth/AuthForm';
import Snack from 'components/snackmessage/Snack';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

const Login = () => {
  const [error, setError] = useState('');
  const onSubmitHandler = (email, password) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err => {
        if ((err.code = 'auth/invalid-credential')) {
          setError('The Credentials are Incorrect!');
          return;
        }
        setError(err.code);
      });
  };
  return (
    <View style={styles.container}>
      <AuthForm onSubmit={onSubmitHandler} location="login" />
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
