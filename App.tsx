import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Chat from './src/screens/Chat';
import History from './src/screens/History';
import HistoryDetails from './src/screens/HistoryDetails';
import { HistoryProvider } from './src/screens/context/HistoryContext';
import LoginScreen from './src/Auth/LoginScreen';
import ModeSelector from './src/screens/ModeSelector';
import SignUpScreen from './src/Auth/SignUpScreen';
import LanguageSelector from './src/screens/LanguageSelector';

export type RootStackParamList = {
  LoginScreen: undefined;
  SignUpScreen: undefined;
  LanguageSelector: undefined;
  ModeSelector: {
    from:string, 
    to:string
  };
  Chat: {
    from:string, 
    to:string,
    mode:string
  };
  History: undefined;
  HistoryDetails: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
    return (
        <HistoryProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="LanguageSelector">
                    <Stack.Screen name="LoginScreen" component={LoginScreen} />
                    <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
                    <Stack.Screen name="LanguageSelector" component={LanguageSelector} />
                    <Stack.Screen name="ModeSelector" component={ModeSelector} />
                    <Stack.Screen name="Chat" component={Chat} />
                    <Stack.Screen name="History" component={History} />
                    <Stack.Screen name="HistoryDetails" component={HistoryDetails} />
                </Stack.Navigator>
            </NavigationContainer>
        </HistoryProvider>
    );
};

export default App;
