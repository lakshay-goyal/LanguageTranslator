import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NativeStackScreenProps} from "@react-navigation/native-stack"

import {RootStackParamList} from '../../App'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'

type SignUpProps = NativeStackScreenProps<RootStackParamList, 'SignUpScreen'>


export default function SignUpScreen({navigation}:SignUpProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigator = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const handleSignUp = () => {
    navigator.navigate("LanguageSelector")
    // Handle sign-up logic here
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <View style={styles.row}>
        <TextInput
          // label={'First Name'}
          style={styles.inputHalf}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          // label={'Last Name'}
          style={styles.inputHalf}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>
      <View style={styles.row}>
        <TextInput
          // label={'Email-ID'}
          style={styles.inputHalf}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.row}>
      <TextInput
          // label={'Create Password'}
          style={styles.inputHalf}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          // isPassword
        />
        <TextInput
          // label={'Confirm Password'}
          style={styles.inputHalf}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          // isPassword
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigator.navigate("LoginScreen")}>
        <Text style={styles.redirectText}>Already have an account? Login</Text>
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
    marginBottom: 20,
    textAlign: 'center',
    color: '#0d47a1',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    height: 55,
    borderColor: '#0d47a1',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',
    marginBottom: 20,
  },
  inputHalf: {
    height: 55,
    borderColor: '#0d47a1',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',
    flex: 1,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#1976d2',
    borderRadius: 10,
    paddingVertical: 15,
    marginBottom: 15,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  redirectText: {
    marginTop: 15,
    color: '#0d47a1',
    textAlign: 'center',
  },
});
