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
                items = {[
                    { label: 'Afrikaans', value: 'af' },
                    { label: 'Albanian', value: 'sq' },
                    { label: 'Amharic', value: 'am' },
                    { label: 'Arabic', value: 'ar' },
                    { label: 'Armenian', value: 'hy' },
                    { label: 'Azerbaijani', value: 'az' },
                    { label: 'Basque', value: 'eu' },
                    { label: 'Belarusian', value: 'be' },
                    { label: 'Bengali', value: 'bn' },
                    { label: 'Bosnian', value: 'bs' },
                    { label: 'Bulgarian', value: 'bg' },
                    { label: 'Catalan', value: 'ca' },
                    { label: 'Cebuano', value: 'ceb' },
                    { label: 'Chinese (Simplified)', value: 'zh-cn' },
                    { label: 'Chinese (Traditional)', value: 'zh-tw' },
                    { label: 'Corsican', value: 'co' },
                    { label: 'Croatian', value: 'hr' },
                    { label: 'Czech', value: 'cs' },
                    { label: 'Danish', value: 'da' },
                    { label: 'Dutch', value: 'nl' },
                    { label: 'English', value: 'en' },
                    { label: 'Esperanto', value: 'eo' },
                    { label: 'Estonian', value: 'et' },
                    { label: 'Finnish', value: 'fi' },
                    { label: 'French', value: 'fr' },
                    { label: 'Frisian', value: 'fy' },
                    { label: 'Galician', value: 'gl' },
                    { label: 'Georgian', value: 'ka' },
                    { label: 'German', value: 'de' },
                    { label: 'Greek', value: 'el' },
                    { label: 'Gujarati', value: 'gu' },
                    { label: 'Haitian Creole', value: 'ht' },
                    { label: 'Hausa', value: 'ha' },
                    { label: 'Hawaiian', value: 'haw' },
                    { label: 'Hebrew', value: 'he' },
                    { label: 'Hindi', value: 'hi' },
                    { label: 'Hmong', value: 'hmn' },
                    { label: 'Hungarian', value: 'hu' },
                    { label: 'Icelandic', value: 'is' },
                    { label: 'Igbo', value: 'ig' },
                    { label: 'Indonesian', value: 'id' },
                    { label: 'Irish', value: 'ga' },
                    { label: 'Italian', value: 'it' },
                    { label: 'Japanese', value: 'ja' },
                    { label: 'Javanese', value: 'jw' },
                    { label: 'Kannada', value: 'kn' },
                    { label: 'Kazakh', value: 'kk' },
                    { label: 'Khmer', value: 'km' },
                    { label: 'Kinyarwanda', value: 'rw' },
                    { label: 'Korean', value: 'ko' },
                    { label: 'Kurdish (Kurmanji)', value: 'ku' },
                    { label: 'Kyrgyz', value: 'ky' },
                    { label: 'Lao', value: 'lo' },
                    { label: 'Latin', value: 'la' },
                    { label: 'Latvian', value: 'lv' },
                    { label: 'Lithuanian', value: 'lt' },
                    { label: 'Luxembourgish', value: 'lb' },
                    { label: 'Macedonian', value: 'mk' },
                    { label: 'Malagasy', value: 'mg' },
                    { label: 'Malay', value: 'ms' },
                    { label: 'Malayalam', value: 'ml' },
                    { label: 'Maltese', value: 'mt' },
                    { label: 'Maori', value: 'mi' },
                    { label: 'Marathi', value: 'mr' },
                    { label: 'Mongolian', value: 'mn' },
                    { label: 'Myanmar (Burmese)', value: 'my' },
                    { label: 'Nepali', value: 'ne' },
                    { label: 'Norwegian', value: 'no' },
                    { label: 'Odia (Oriya)', value: 'or' },
                    { label: 'Pashto', value: 'ps' },
                    { label: 'Persian', value: 'fa' },
                    { label: 'Polish', value: 'pl' },
                    { label: 'Portuguese', value: 'pt' },
                    { label: 'Punjabi', value: 'pa' },
                    { label: 'Romanian', value: 'ro' },
                    { label: 'Russian', value: 'ru' },
                    { label: 'Samoan', value: 'sm' },
                    { label: 'Scots Gaelic', value: 'gd' },
                    { label: 'Serbian', value: 'sr' },
                    { label: 'Sesotho', value: 'st' },
                    { label: 'Shona', value: 'sn' },
                    { label: 'Sindhi', value: 'sd' },
                    { label: 'Sinhala', value: 'si' },
                    { label: 'Slovak', value: 'sk' },
                    { label: 'Slovenian', value: 'sl' },
                    { label: 'Somali', value: 'so' },
                    { label: 'Spanish', value: 'es' },
                    { label: 'Sundanese', value: 'su' },
                    { label: 'Swahili', value: 'sw' },
                    { label: 'Swedish', value: 'sv' },
                    { label: 'Tagalog (Filipino)', value: 'tl' },
                    { label: 'Tajik', value: 'tg' },
                    { label: 'Tamil', value: 'ta' },
                    { label: 'Tatar', value: 'tt' },
                    { label: 'Telugu', value: 'te' },
                    { label: 'Thai', value: 'th' },
                    { label: 'Turkish', value: 'tr' },
                    { label: 'Turkmen', value: 'tk' },
                    { label: 'Ukrainian', value: 'uk' },
                    { label: 'Urdu', value: 'ur' },
                    { label: 'Uyghur', value: 'ug' },
                    { label: 'Uzbek', value: 'uz' },
                    { label: 'Vietnamese', value: 'vi' },
                    { label: 'Welsh', value: 'cy' },
                    { label: 'Xhosa', value: 'xh' },
                    { label: 'Yiddish', value: 'yi' },
                    { label: 'Yoruba', value: 'yo' },
                    { label: 'Zulu', value: 'zu' }
                ]}
                
                style={pickerSelectStyles}
            />
            <RNPickerSelect
                placeholder={{ label: 'Select To Language...', value: null }} // Placeholder only
                onValueChange={(value) => {
                    setToLanguage(value);
                    setErrorMessage(''); // Clear error message when a selection is made
                }}
                items = {[
                    { label: 'Afrikaans', value: 'af' },
                    { label: 'Albanian', value: 'sq' },
                    { label: 'Amharic', value: 'am' },
                    { label: 'Arabic', value: 'ar' },
                    { label: 'Armenian', value: 'hy' },
                    { label: 'Azerbaijani', value: 'az' },
                    { label: 'Basque', value: 'eu' },
                    { label: 'Belarusian', value: 'be' },
                    { label: 'Bengali', value: 'bn' },
                    { label: 'Bosnian', value: 'bs' },
                    { label: 'Bulgarian', value: 'bg' },
                    { label: 'Catalan', value: 'ca' },
                    { label: 'Cebuano', value: 'ceb' },
                    { label: 'Chinese (Simplified)', value: 'zh-cn' },
                    { label: 'Chinese (Traditional)', value: 'zh-tw' },
                    { label: 'Corsican', value: 'co' },
                    { label: 'Croatian', value: 'hr' },
                    { label: 'Czech', value: 'cs' },
                    { label: 'Danish', value: 'da' },
                    { label: 'Dutch', value: 'nl' },
                    { label: 'English', value: 'en' },
                    { label: 'Esperanto', value: 'eo' },
                    { label: 'Estonian', value: 'et' },
                    { label: 'Finnish', value: 'fi' },
                    { label: 'French', value: 'fr' },
                    { label: 'Frisian', value: 'fy' },
                    { label: 'Galician', value: 'gl' },
                    { label: 'Georgian', value: 'ka' },
                    { label: 'German', value: 'de' },
                    { label: 'Greek', value: 'el' },
                    { label: 'Gujarati', value: 'gu' },
                    { label: 'Haitian Creole', value: 'ht' },
                    { label: 'Hausa', value: 'ha' },
                    { label: 'Hawaiian', value: 'haw' },
                    { label: 'Hebrew', value: 'he' },
                    { label: 'Hindi', value: 'hi' },
                    { label: 'Hmong', value: 'hmn' },
                    { label: 'Hungarian', value: 'hu' },
                    { label: 'Icelandic', value: 'is' },
                    { label: 'Igbo', value: 'ig' },
                    { label: 'Indonesian', value: 'id' },
                    { label: 'Irish', value: 'ga' },
                    { label: 'Italian', value: 'it' },
                    { label: 'Japanese', value: 'ja' },
                    { label: 'Javanese', value: 'jw' },
                    { label: 'Kannada', value: 'kn' },
                    { label: 'Kazakh', value: 'kk' },
                    { label: 'Khmer', value: 'km' },
                    { label: 'Kinyarwanda', value: 'rw' },
                    { label: 'Korean', value: 'ko' },
                    { label: 'Kurdish (Kurmanji)', value: 'ku' },
                    { label: 'Kyrgyz', value: 'ky' },
                    { label: 'Lao', value: 'lo' },
                    { label: 'Latin', value: 'la' },
                    { label: 'Latvian', value: 'lv' },
                    { label: 'Lithuanian', value: 'lt' },
                    { label: 'Luxembourgish', value: 'lb' },
                    { label: 'Macedonian', value: 'mk' },
                    { label: 'Malagasy', value: 'mg' },
                    { label: 'Malay', value: 'ms' },
                    { label: 'Malayalam', value: 'ml' },
                    { label: 'Maltese', value: 'mt' },
                    { label: 'Maori', value: 'mi' },
                    { label: 'Marathi', value: 'mr' },
                    { label: 'Mongolian', value: 'mn' },
                    { label: 'Myanmar (Burmese)', value: 'my' },
                    { label: 'Nepali', value: 'ne' },
                    { label: 'Norwegian', value: 'no' },
                    { label: 'Odia (Oriya)', value: 'or' },
                    { label: 'Pashto', value: 'ps' },
                    { label: 'Persian', value: 'fa' },
                    { label: 'Polish', value: 'pl' },
                    { label: 'Portuguese', value: 'pt' },
                    { label: 'Punjabi', value: 'pa' },
                    { label: 'Romanian', value: 'ro' },
                    { label: 'Russian', value: 'ru' },
                    { label: 'Samoan', value: 'sm' },
                    { label: 'Scots Gaelic', value: 'gd' },
                    { label: 'Serbian', value: 'sr' },
                    { label: 'Sesotho', value: 'st' },
                    { label: 'Shona', value: 'sn' },
                    { label: 'Sindhi', value: 'sd' },
                    { label: 'Sinhala', value: 'si' },
                    { label: 'Slovak', value: 'sk' },
                    { label: 'Slovenian', value: 'sl' },
                    { label: 'Somali', value: 'so' },
                    { label: 'Spanish', value: 'es' },
                    { label: 'Sundanese', value: 'su' },
                    { label: 'Swahili', value: 'sw' },
                    { label: 'Swedish', value: 'sv' },
                    { label: 'Tagalog (Filipino)', value: 'tl' },
                    { label: 'Tajik', value: 'tg' },
                    { label: 'Tamil', value: 'ta' },
                    { label: 'Tatar', value: 'tt' },
                    { label: 'Telugu', value: 'te' },
                    { label: 'Thai', value: 'th' },
                    { label: 'Turkish', value: 'tr' },
                    { label: 'Turkmen', value: 'tk' },
                    { label: 'Ukrainian', value: 'uk' },
                    { label: 'Urdu', value: 'ur' },
                    { label: 'Uyghur', value: 'ug' },
                    { label: 'Uzbek', value: 'uz' },
                    { label: 'Vietnamese', value: 'vi' },
                    { label: 'Welsh', value: 'cy' },
                    { label: 'Xhosa', value: 'xh' },
                    { label: 'Yiddish', value: 'yi' },
                    { label: 'Yoruba', value: 'yo' },
                    { label: 'Zulu', value: 'zu' }
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
