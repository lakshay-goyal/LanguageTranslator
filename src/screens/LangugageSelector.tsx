import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { RootStackParamList } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const LanguageSelector = () => {
    const [fromLanguage, setFromLanguage] = useState('');
    const [toLanguage, setToLanguage] = useState('');
    const navigator = useNavigation<NativeStackNavigationProp<RootStackParamList>>()


    const handleNext = () => {
        // Handle the next button click, e.g., navigate to the translation page
        console.log(`From: ${fromLanguage}, To: ${toLanguage}`);
        navigator.navigate("ModeSelector")
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Languages for Translation</Text>
            <RNPickerSelect
                placeholder={{ label: 'Select From Language...', value: null }}
                onValueChange={(value) => setFromLanguage(value)}
                items={[
                    { label: 'English', value: 'en' },
                    { label: 'Spanish', value: 'es' },
                    { label: 'French', value: 'fr' },
                    // Add more languages as needed
                ]}
                style={pickerSelectStyles}
            />
            <RNPickerSelect
                placeholder={{ label: 'Select To Language...', value: null }}
                onValueChange={(value) => setToLanguage(value)}
                items={[
                    { label: 'English', value: 'en' },
                    { label: 'Spanish', value: 'es' },
                    { label: 'French', value: 'fr' },
                    // Add more languages as needed
                ]}
                style={pickerSelectStyles}
            />
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
