import Snack from 'components/snackmessage/Snack';
import React, { useState } from 'react';
import { View } from 'react-native';

import { Button, Text, TextInput } from 'react-native-paper';

const AuthForm = ({ onSubmit, authError }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(authError);
  const onSubmitHandler = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      setError('Email format is incorrect');
      return;
    }
    if (password.length <= 8) {
      setError('Passwors is too short');
      return;
    }
    onSubmit(email, password);
  };
  return (
    <View>
      <TextInput
        label="Email"
        mode="outlined"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        label="Password"
        mode="outlined"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      {error && <Snack message={error} messageHandler={setError} />}
      <Button icon="login" mode="elevated" onPress={onSubmitHandler}>
        Press me
      </Button>
    </View>
  );
};

export default AuthForm;
