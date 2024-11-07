import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { RootStackParamList } from '../../App';

type ModeSelectorProps = RouteProp<RootStackParamList, 'ModeSelector'>;

const ModeSelector = () => {
    const [mode, setMode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigator = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const route = useRoute<ModeSelectorProps>();
    const { from, to } = route.params || {};
    console.log(`From: ${from}, To: ${to}`);

    const handleNext = () => {
        console.log("Hello");
        if (!mode) {
            
            setErrorMessage('Please select a mode before proceeding.');
            return;
        }
        setErrorMessage('');
        console.log(`Selected Mode: ${mode}`);
        navigator.navigate("Chat", {from, to, mode});
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Your Mode</Text>
            <View style={styles.radioContainer}>
                <TouchableOpacity 
                    style={[styles.radioButton, mode === 'online' && styles.selectedRadio]} 
                    onPress={() => {
                        setMode('online');
                        setErrorMessage('');
                    }}
                >
                    <Text style={[styles.radioText, mode === 'online' && styles.selectedText]}>Online</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.radioButton, mode === 'offline' && styles.selectedRadio]} 
                    onPress={() => {
                        setMode('offline');
                        setErrorMessage('');
                    }}
                >
                    <Text style={[styles.radioText, mode === 'offline' && styles.selectedText]}>Offline</Text>
                </TouchableOpacity>
            </View>
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
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
        backgroundColor: '#e0f7fa', // Light blue background
    },
    title: {
        fontSize: 32,
        marginBottom: 40,
        textAlign: 'center',
        color: '#00796b', // Dark teal color
        fontWeight: 'bold',
    },
    radioContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 30,
    },
    radioButton: {
        padding: 15,
        borderWidth: 2,
        borderColor: '#007BFF',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        width: '40%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5, // For Android shadow
    },
    selectedRadio: {
        backgroundColor: '#007BFF',
    },
    radioText: {
        color: '#333',
        fontSize: 18,
    },
    selectedText: {
        color: '#fff', // White text for selected mode
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 20,
        elevation: 3, // For Android shadow
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red', // Error message color
        marginTop: 10, // Spacing above the error message
        textAlign: 'center', // Center the error message
    },
});

export default ModeSelector;
