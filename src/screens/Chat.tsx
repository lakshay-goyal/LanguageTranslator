import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { RootStackParamList } from '../../App';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useHistory } from './context/HistoryContext';
import { Platform } from 'react-native';
import Tts from 'react-native-tts';

type TranslationRequest = {
    text: string;
    source_language: string;
    target_language: string;
};

interface TranslationResponse {
    result: string;
};

type ChatProps = RouteProp<RootStackParamList, 'Chat'>;

const Chat = () => {
    const [messages, setMessages] = useState<{ id: string; text: string; isUser: boolean }[]>([]);
    const [inputText, setInputText] = useState('');
    const navigator = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { addHistoryEntry } = useHistory();
    const [buttonClicked, setButtonClicked] = useState(false);
    const route = useRoute<ChatProps>();
    const { from, to, mode } = route.params || {};

    useEffect(() => {
        if (!buttonClicked) return;
    
        const fetchTranslation = async () => {
            try {
                const baseUrl = Platform.select({
                    android: __DEV__
                        ? 'http://localhost:8000'
                        : 'http://your-prod-url.com',
                    ios: __DEV__
                        ? 'http://localhost:8000'
                        : 'http://your-prod-url.com',
                });
    
                const data: TranslationRequest = {
                    text: inputText, // Use the actual input text
                    source_language: from,
                    target_language: to,
                };
    
                const response = await fetch(`${baseUrl}/translate/`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
    
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Server error: ${response.status}`);
                }
    
                const result: TranslationResponse = await response.json();
    
                // Add the user's message
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        id: Date.now().toString(),
                        text: inputText,
                        isUser: true,
                    },
                ]);
    
                // Add the translation response and read it aloud
                setTimeout(() => {
                    const translationMessage = {
                        id: (Date.now() + 1).toString(),
                        text: result.result,
                        isUser: false,
                    };
    
                    setMessages((prevMessages) => [...prevMessages, translationMessage]);
    
                    // Dynamic TTS based on target language
                    Tts.voices().then((voices) => {
                        const selectedVoice = voices.find((voice) =>
                            voice.language.startsWith(to)
                        );
    
                        if (selectedVoice) {
                            Tts.setDefaultLanguage(selectedVoice.language);
                        } else {
                            console.warn(
                                `Language ${to} not supported, falling back to default.`
                            );
                            Tts.setDefaultLanguage('en-US');
                        }
    
                        // Set rate and pitch for better pronunciation
                        Tts.setDefaultRate(0.5);
                        Tts.setDefaultPitch(1.0);
    
                        // Speak the translated text
                        Tts.speak(result.result);
                    });
                }, 500);
    
                setInputText(''); // Clear input after sending
            } catch (error) {
                const errorMessage = {
                    id: Date.now().toString(),
                    text: `Error: ${error.message}`,
                    isUser: false,
                };
                setMessages((prevMessages) => [...prevMessages, errorMessage]);
            }
        };
    
        fetchTranslation();
        setButtonClicked(false);
    }, [buttonClicked, inputText, from, to]);
    
      

    const handleSend = () => {
        if (inputText.trim()) {
            setButtonClicked(true);
        }
    };

    const handleCancel = () => {
        if (messages.length === 0) {
            return;
        }

        const formattedMessages = messages.map(message => ({
            sender: message.isUser ? 'User' : 'Receiver',
            text: message.text,
            timestamp: Date.now(),
        }));

        addHistoryEntry(Date.now().toString(), formattedMessages);
        navigator.navigate("History");
    };

    const renderMessage = ({ item }: { item: { id: string; text: string; isUser: boolean } }) => {
        return (
            <View style={[styles.messageContainer, item.isUser ? styles.userMessage : styles.responseMessage]}>
                <Text style={[styles.messageText, item.isUser ? styles.userText : styles.responseText]}>
                    {item.text}
                </Text>
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
                <TouchableOpacity 
                    style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
                    onPress={handleSend}
                    disabled={!inputText.trim()}
                >
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
        backgroundColor: '#4CAF50', // Green background for user messages
    },
    responseMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#ffffff', // White background for responses
        borderColor: '#e0e0e0',
        borderWidth: 1,
    },
    messageText: {
        fontSize: 16,
        lineHeight: 20,
    },
    userText: {
        color: '#fff', // White text for user messages
    },
    responseText: {
        color: '#333', // Dark text for responses
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
        minHeight: 40,
    },
    sendButton: {
        backgroundColor: '#4CAF50', // Matching green color for send button
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    sendButtonDisabled: {
        backgroundColor: '#cccccc',
    },
    sendButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Chat;