import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useHistory } from './context/HistoryContext';

// Define the types for the messages and history entry
type Message = {
    sender: string;
    text: string;
    timestamp: number;
};

type HistoryEntry = {
    id: string;
    messages: Message[];
};

const History = () => {
    const { history } = useHistory(); // Ensure this returns the correct structure
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    // Debugging: Check the structure of history
    console.log('History Data:', history);

    const handleEntryPress = (entry: HistoryEntry) => {
        navigation.navigate('HistoryDetails', { messages: entry.messages });
    };

    const renderHistoryItem = ({ item }: { item: HistoryEntry }) => (
        <TouchableOpacity onPress={() => handleEntryPress(item)} activeOpacity={0.7}>
            <View style={styles.historyItem}>
                <Text style={styles.historyText}>Chat with {item.messages[0].sender}</Text>
                <Text style={styles.lastMessageText}>{item.messages[item.messages.length - 1].text}</Text>
                <Text style={styles.timestampText}>Last updated: {new Date(item.messages[item.messages.length - 1].timestamp).toLocaleString()}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={history.reverse()} // Ensure history is an array of HistoryEntry
                renderItem={renderHistoryItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.historyList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
    historyItem: {
        padding: 15,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    historyText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    lastMessageText: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    timestampText: {
        fontSize: 12,
        color: '#999',
        marginTop: 2,
    },
    historyList: {
        paddingBottom: 10,
    },
});

export default History;
