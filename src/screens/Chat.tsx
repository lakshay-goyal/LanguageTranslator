import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Svg, { Path } from 'react-native-svg'; // Importing SVG for the cancel button
import { RootStackParamList } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useHistory } from './context/HistoryContext';


const Chat = () => {
    const [messages, setMessages] = useState<{ id: string; text: string; isUser: boolean }[]>([]);
    const [inputText, setInputText] = useState('');
    const navigator = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const { addHistoryEntry } = useHistory(); // Get the addHistoryEntry function

    const handleSend = () => {
        if (inputText.trim()) {
            const newMessage = { id: Date.now().toString(), text: inputText, isUser: true };
            setMessages((prevMessages) => [...prevMessages, newMessage]);

            setTimeout(() => {
                const responseMessage = { id: Date.now().toString(), text: `Response to: ${inputText}`, isUser: false };
                setMessages((prevMessages) => [...prevMessages, responseMessage]);
            }, 1000);

            setInputText('');
        }
    };

    const handleCancel = () => {
        const formattedMessages = messages.map(message => ({
            sender: message.isUser ? 'User' : 'Receiver',
            text: message.text,
            timestamp: Date.now(),
        }));

        // Add the conversation to history
        addHistoryEntry(Date.now().toString(), formattedMessages);

        // Navigate to ModeSelector or History
        navigator.navigate("History");
    };

    const renderMessage = ({ item }: { item: { id: string; text: string; isUser: boolean } }) => {
        return (
            <View style={[styles.messageContainer, item.isUser ? styles.userMessage : styles.responseMessage]}>
                <Text style={[styles.messageText, item.isUser ? styles.userText : styles.responseText]}>{item.text}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleCancel}>
                    <Svg width="24px" height="24px" viewBox="0 0 24 24" fill="none">
                        <Path d="M20 13V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V13" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <Path d="M12 15V3M12 3L8.5 6.5M12 3L15.5 6.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </Svg>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Chat</Text>
            </View>
            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.messageList}
                showsVerticalScrollIndicator={false}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message..."
                    value={inputText}
                    onChangeText={setInputText}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        backgroundColor: '#fff',
        borderRadius: 20,
        elevation: 3,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        paddingHorizontal: 15,
        marginRight: 10,
        backgroundColor: '#f9f9f9',
    },
    sendButton: {
        backgroundColor: '#007BFF',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    sendButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Chat;
