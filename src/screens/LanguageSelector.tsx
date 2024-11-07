import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { RootStackParamList } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type LanguageSelectorProp = NativeStackNavigationProp<
  RootStackParamList,
  'LanguageSelector'
>;

const LanguageSelector = () => {
    const [fromLanguage, setFromLanguage] = useState('');
    const [toLanguage, setToLanguage] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    const navigator = useNavigation<LanguageSelectorProp>();

    const handleNext = () => {
        // Check if either language is not selected or if they are the same
        if (!fromLanguage || !toLanguage) {
            setErrorMessage('Both languages must be selected.'); // Set error message if either is empty
            return;
        } else if (fromLanguage === toLanguage) {
            setErrorMessage('Both languages must be different.'); // Set error message if they are the same
            return;
        }
        // Clear the error message if validation passes
        setErrorMessage('');
        // Handle the next button click, e.g., navigate to the translation page
        navigator.navigate("ModeSelector", { from:fromLanguage, to:toLanguage });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Languages for Translation</Text>
            <RNPickerSelect
                placeholder={{ label: 'Select From Language...', value: null }} // Placeholder only
                onValueChange={(value) => {
                    setFromLanguage(value);
                    setErrorMessage(''); // Clear error message when a selection is made
                }}
                items={[
                    { label: 'English', value: 'en' },
                    { label: 'Spanish', value: 'es' },
                    { label: 'French', value: 'fr' },
                    // Add more languages as needed
                ]}
                style={pickerSelectStyles}
            />
            <RNPickerSelect
                placeholder={{ label: 'Select To Language...', value: null }} // Placeholder only
                onValueChange={(value) => {
                    setToLanguage(value);
                    setErrorMessage(''); // Clear error message when a selection is made
                }}
                items={[
                    { label: 'English', value: 'en' },
                    { label: 'Spanish', value: 'es' },
                    { label: 'French', value: 'fr' },
                    // Add more languages as needed
                ]}
                style={pickerSelectStyles}
            />
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null} {/* Display error message */}
            <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5', // Light background color
    },
    title: {
        fontSize: 28,
        marginBottom: 30,
        textAlign: 'center',
        color: '#333', // Darker text color
    },
    button: {
        backgroundColor: '#007BFF', // Primary button color
        paddingVertical: 15,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff', // White text color
        textAlign: 'center',
        fontSize: 18,
    },
    errorText: {
        color: 'red', // Error message color
        marginTop: 10, // Spacing above the error message
        textAlign: 'center', // Center the error message
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#007BFF', // Border color matching the button
        borderRadius: 4,
        color: 'black',
        marginBottom: 20,
        backgroundColor: '#fff', // White background for dropdown
    },
    inputAndroid: {
        fontSize: 16,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#007BFF', // Border color matching the button
        borderRadius: 4,
        color: 'black',
        marginBottom: 20,
        backgroundColor: '#fff', // White background for dropdown
    },
});

export default LanguageSelector;
