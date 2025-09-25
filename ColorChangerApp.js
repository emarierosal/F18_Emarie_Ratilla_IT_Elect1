import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';

const ColorChangerApp = () => {
    const [backgroundColor, setBackgroundColor] = useState('white');

    return ( <
        View style = {
            [styles.container, { backgroundColor }]
        } >
        <
        Button title = "Default (White)"
        onPress = {
            () => setBackgroundColor('white')
        }
        /> <
        Button title = "Light Blue"
        onPress = {
            () => setBackgroundColor('lightblue')
        }
        /> <
        Button title = "Light Green"
        onPress = {
            () => setBackgroundColor('lightgreen')
        }
        /> < /
        View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ColorChangerApp;