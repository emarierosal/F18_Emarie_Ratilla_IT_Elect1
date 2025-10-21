import React, { useState, useRef } from 'react';
import {
    SafeAreaView,
    View,
    TextInput,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Image,
    ImageBackground,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import userPhoto from './assets/Screen.jpg';
import chatmatePhoto from './assets/Chatmate.jpg';
import bgPhoto from './assets/Background.jpg';

const MyFlatList = ({ messages }) => {
    return ( <
        FlatList data = { messages }
        keyExtractor = {
            (item) => item.id.toString() }
        renderItem = {
            ({ item }) => ( <
                View style = {
                    [
                        styles.messageRow,
                        item.sender === 'you' ? styles.rightAlign : styles.leftAlign,
                    ]
                } >
                {
                    item.sender === 'chatmate' && ( <
                        Image source = { chatmatePhoto }
                        style = { styles.avatar }
                        />
                    )
                }

                <
                View style = {
                    [
                        styles.messageBubble,
                        item.sender === 'you' ?
                        styles.yourBubble :
                        styles.chatmateBubble,
                    ]
                } >
                {
                    item.image ? ( <
                        Image source = {
                            { uri: item.image } }
                        style = { styles.messageImage }
                        />
                    ) : ( <
                        Text style = {
                            [
                                styles.messageText,
                                item.sender === 'you' ?
                                styles.yourText :
                                styles.chatmateText,
                            ]
                        } >
                        { item.text } <
                        /Text>
                    )
                } <
                /View>

                {
                    item.sender === 'you' && ( <
                        Image source = { userPhoto }
                        style = { styles.avatar }
                        />
                    )
                } <
                /View>
            )
        }
        inverted contentContainerStyle = {
            { flexGrow: 1, justifyContent: 'flex-end' } }
        />
    );
};

export default function Messenger() {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const nextId = useRef(1);

    const sendMessage = () => {
        if (inputText.trim() === '') return;

        const newMessage = {
            id: nextId.current,
            text: inputText.trim(),
            sender: 'you',
        };
        nextId.current += 1;

        setMessages((prev) => [newMessage, ...prev]);

        setTimeout(() => {
            const reply = {
                id: nextId.current,
                text: 'Hello!',
                sender: 'chatmate',
            };
            nextId.current += 1;
            setMessages((prev) => [reply, ...prev]);
        }, 1500);

        setInputText('');
    };

    const pickImage = async() => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            alert('Permission to access gallery is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.7,
        });

        if (!result.canceled) {
            const newMessage = {
                id: nextId.current,
                image: result.assets[0].uri,
                sender: 'you',
            };
            nextId.current += 1;
            setMessages((prev) => [newMessage, ...prev]);

            setTimeout(() => {
                const reply = {
                    id: nextId.current,
                    text: 'Wow, great photo!',
                    sender: 'chatmate',
                };
                nextId.current += 1;
                setMessages((prev) => [reply, ...prev]);
            }, 1500);
        }
    };

    return ( <
        SafeAreaView style = { styles.container } >
        <
        ImageBackground source = { bgPhoto }
        style = { styles.backgroundImage }
        resizeMode = "cover" >
        <
        KeyboardAvoidingView style = { styles.innerContainer }
        behavior = { Platform.OS === 'ios' ? 'padding' : undefined }
        keyboardVerticalOffset = { 90 } >

        <
        Text style = { styles.headerText } > Welcome to Messenger < /Text>


        <
        MyFlatList messages = { messages }
        />


        <
        View style = { styles.inputContainer } >
        <
        TouchableOpacity style = { styles.imageButton }
        onPress = { pickImage } >
        <
        Text style = { styles.imageButtonText } > 📷 < /Text> <
        /TouchableOpacity>

        <
        TextInput style = { styles.textInput }
        placeholder = "Type a message"
        placeholderTextColor = "#999"
        value = { inputText }
        onChangeText = { setInputText }
        multiline /
        >

        <
        TouchableOpacity style = { styles.sendButton }
        onPress = { sendMessage } >
        <
        Text style = { styles.sendButtonText } > Send < /Text> <
        /TouchableOpacity> <
        /View> <
        /KeyboardAvoidingView> <
        /ImageBackground> <
        /SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    innerContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    headerText: {
        fontSize: 18,
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        textAlign: 'center',
        fontWeight: 'bold',
        backgroundColor: 'rgba(255,255,255,0.7)',
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    messageRow: {

        flexDirection: 'row',
        marginVertical: 4,
        marginHorizontal: 12,
        alignItems: 'flex-end',
    },
    rightAlign: { alignSelf: 'flex-end' },
    leftAlign: { alignSelf: 'flex-start' },
    messageBubble: {
        padding: 10,
        borderRadius: 12,
        maxWidth: '70%',
    },
    yourBubble: {
        backgroundColor: 'rgba(0, 120, 254, 0.85)',
        borderBottomRightRadius: 2,
    },
    chatmateBubble: {
        backgroundColor: 'rgba(229, 229, 234, 0.9)',
        borderBottomLeftRadius: 2,
    },
    messageText: { fontSize: 16 },
    yourText: { color: '#fff' },
    chatmateText: { color: '#000' },
    messageImage: {
        width: 200,
        height: 200,
        borderRadius: 10,
    },
    avatar: {
        width: 35,
        height: 35,
        borderRadius: 20,
        marginHorizontal: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderTopWidth: 1,
        borderColor: '#ddd',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
    imageButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    imageButtonText: { fontSize: 26 },
    textInput: {
        flex: 1,
        maxHeight: 100,
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 20,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    sendButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0078fe',
        borderRadius: 20,
        paddingHorizontal: 16,
        marginLeft: 8,
    },
    sendButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});