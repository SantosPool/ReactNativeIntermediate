import {
  StyleSheet,
  Text,
  View,
  Button as RNButton,
  Alert,
} from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Input, makeHttpRequest, Spinner, URL_API_REST } from '@core';

export const LoginScreen = ({ navigation }: any) => {
  const { top } = useSafeAreaInsets();

  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  console.log(email, password);

  async function onSubmit() {
    if (!email || !password) {
      Alert.alert('Error', 'Email or password is empty');
      return;
    }

    setLoading(true);
    try {
      const response = await makeHttpRequest({
        host: URL_API_REST,
        path: '/auth/login',
        method: 'POST',
        body: { username: email, password },
      });

      console.log(response);
      navigation.navigate('MainApp', {
        screen: 'Home',
        params: { token: response.accessToken },
      });
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
    setLoading(false);
  }

  return (
    <View style={[styles.container, { paddingTop: top + 100 }]}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <Input value={email} onChange={setEmail} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <Input value={password} onChange={setPassword} />
      </View>
      <View style={styles.buttonsContainer}>
        {loading ? (
          <Spinner />
        ) : (
          <Button tittle='Iniciar Session' onPress={onSubmit} />
        )}
        <RNButton title='Crear cuenta' onPress={() => null} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: 'PlaypenSans-Bold',
    textAlign: 'center',
    marginBottom: 90,
  },
  inputContainer: {},
  label: {
    fontSize: 16,
    fontFamily: 'PlaypenSans-Regular',
    marginBottom: 8,
  },
  buttonsContainer: {
    marginTop: 90,
    gap: 24,
  },
});
