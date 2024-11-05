import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';

import {NativeStackScreenProps} from "@react-navigation/native-stack"
import { useNavigation } from '@react-navigation/native';
import {RootStackParamList} from '../../App'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'

type LoginProps = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>

export default function LoginScreen({navigation}:LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigator = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    let valid = true;
    setEmailError('');
    setPasswordError('');

    if (!email.trim()) {
      setEmailError('Email is required');
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      valid = false;
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      valid = false;
    }

    if (valid) {
      navigator.navigate("LanguageSelector");
      console.log('Email:', email);
      console.log('Password:', password);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <TextInput
        style={[styles.input, emailError ? styles.inputError : null]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <TextInput
        style={[styles.input, passwordError ? styles.inputError : null]}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text 
          style={styles.forgotPassword} 
          onPress={() => navigator.navigate("SignUpScreen")}>
            Create new Account!
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#e3f2fd',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#0d47a1',
  },
  input: {
    height: 50,
    borderColor: '#0d47a1',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',
  },
  inputError: {
    borderColor: 'red',
  },
  button: {
    backgroundColor: '#1976d2',
    borderRadius: 10,
    paddingVertical: 15,
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  forgotPassword: {
    marginTop: 10,
    color: '#0d47a1',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
