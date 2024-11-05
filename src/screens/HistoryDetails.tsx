import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useRoute } from '@react-navigation/native';

const HistoryDetails = () => {
    const route = useRoute<RouteProp<{ params: { messages: Array<{ sender: string; text: string; timestamp: number }> } }>>();

    const { messages } = route.params;

    const renderMessage = ({ item }: { item: { sender: string; text: string; timestamp: number } }) => (
        <View style={[styles.messageContainer, item.sender === 'User' ? styles.userMessage : styles.responseMessage]}>
            <Text style={[styles.messageText, item.sender === 'User' ? styles.userText : styles.responseText]}>{item.text}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item, index) => index.toString()} // Use index as key if no unique id
                contentContainerStyle={styles.messageList}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 10,
    },
    header: {
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 10,
        marginBottom: 10,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    messageList: {
        paddingBottom: 10,
    },
    messageContainer: {
        maxWidth: '80%',
        padding: 12,
        borderRadius: 20,
        marginVertical: 5,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#007BFF',
    },
    responseMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#ffffff',
        borderColor: '#ccc',
        borderWidth: 1,
    },
    messageText: {
        fontSize: 16,
        lineHeight: 20,
    },
    userText: {
        color: '#fff',
    },
    responseText: {
        color: '#333',
    },
});

export default HistoryDetails;
