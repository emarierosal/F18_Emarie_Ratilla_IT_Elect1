import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

export default function CommentApp() {
    const [comments, setComments] = useState([]);
    const [input, setInput] = useState('');

    const handleAddComment = () => {
        const trimmed = input.trim();
        if (!trimmed) return;
        setComments([...comments, trimmed]);
        setInput('');
    };

    return ( <
        KeyboardAvoidingView style = { styles.container }
        behavior = { Platform.OS === 'ios' ? 'padding' : undefined }
        keyboardVerticalOffset = { 80 } >
        <
        Text style = { styles.title } > Comment Section < /Text> <
        TextInput style = { styles.input }
        placeholder = "Write a comment..."
        value = { input }
        onChangeText = { setInput }
        multiline onSubmitEditing = {
            () => {}
        }
        blurOnSubmit = { false }
        /> <
        Button title = "Add Comment"
        onPress = { handleAddComment }
        disabled = { input.trim() === '' }
        />

        <
        FlatList style = { styles.list }
        x data = { comments }
        keyExtractor = {
            (item, index) => index.toString()
        }
        ListEmptyComponent = { < Text style = { styles.noComments } > No comments yet. < /Text>}
            renderItem = {
                ({ item }) => ( <
                    View style = { styles.commentBox } >
                    <
                    Text style = { styles.commentText } > { item } < /Text> < /
                    View >
                )
            }
            /> < /
            KeyboardAvoidingView >
        );
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            backgroundColor: '#fff',
        },
        title: {
            fontSize: 22,
            marginBottom: 15,
            fontWeight: 'bold',
        },
        input: {
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 6,
            padding: 10,
            fontSize: 16,
            minHeight: 60,
            marginBottom: 10,
            textAlignVertical: 'top', // for Android multiline to start at top-left
        },
        list: {
            marginTop: 20,
        },
        noComments: {
            color: '#888',
            fontStyle: 'italic',
        },
        commentBox: {
            backgroundColor: '#f0f0f0',
            padding: 12,
            borderRadius: 6,
            marginBottom: 10,
        },
        commentText: {
            fontSize: 16,
        },
    });