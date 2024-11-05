import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type SignUpProps = NativeStackScreenProps<RootStackParamList, 'SignUpScreen'>;

export default function SignUpScreen({ navigation }: SignUpProps) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');

    const navigator = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
        return emailRegex.test(email);
    };

    const handleSignUp = () => {
        let valid = true;
        setEmailError('');
        setPasswordError('');
        setConfirmPasswordError('');
        setFirstNameError('');
        setLastNameError('');

        if (!firstName.trim()) {
            setFirstNameError('First Name is required');
            valid = false;
        }

        if (!lastName.trim()) {
            setLastNameError('Last Name is required');
            valid = false;
        }

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

        if (!confirmPassword.trim()) {
            setConfirmPasswordError('Confirm Password is required');
            valid = false;
        } else if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
            valid = false;
        }

        if (valid) {
            navigator.navigate("LanguageSelector");
            console.log('First Name:', firstName);
            console.log('Last Name:', lastName);
            console.log('Email:', email);
            console.log('Password:', password);
            console.log('Confirm Password:', confirmPassword);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, firstNameError ? styles.inputError : null]}
                    placeholder="First Name"
                    value={firstName}
                    onChangeText={setFirstName}
                />
                {firstNameError ? <Text style={styles.errorText}>{firstNameError}</Text> : null}
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, lastNameError ? styles.inputError : null]}
                    placeholder="Last Name"
                    value={lastName}
                    onChangeText={setLastName}
                />
                {lastNameError ? <Text style={styles.errorText}>{lastNameError}</Text> : null}
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, emailError ? styles.inputError : null]}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, passwordError ? styles.inputError : null]}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, confirmPasswordError ? styles.inputError : null]}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />
                {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
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
    inputContainer: {
        flexDirection: 'column', // Set flex direction to column
        marginBottom: 20,
    },
    input: {
        height: 55,
        borderColor: '#0d47a1',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        backgroundColor: '#ffffff',
    },
    inputError: {
        borderColor: 'red', // Change border color to red for error
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
    errorText: {
        color: 'red', // Error message color
        marginTop: 5, // Added margin for spacing above the error text
        marginBottom: 10,
    },
});
