import React from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';

export default (props) => {
    return (
        <View style={styles.wrapper}>
            {props.label && <Text style={styles.label}>{props.label}:</Text>}
            <View style={styles.textAreaContainer}>
                <TextInput
                    style={styles.textarea}
                    multiline={true}
                    numberOfLines={10}
                    underlineColorAndroid="transparent"
                    onChangeText={(text) => props.onUpdate(text)}
                    placeholder={props.placeholder}
                    placeholderTextColor={'#bcbcbc'}
                    selectionColor="#aaa"
                    keyboardType={props.keyboardType || 'default'}
                    value={props.value}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        marginVertical: 10,
    },
    label: {
        marginLeft: '5%',
        fontSize: 16,
    },
    textAreaContainer: {
        alignSelf: 'center',
        width: '100%',
    },
    textarea: {
        paddingHorizontal: 16,
        alignSelf: 'center',
        textAlignVertical: 'top',
        width: '90%',
        height: 150,
        borderRadius: 5,
        backgroundColor: '#F2F3F4',
        fontSize: 16,
    },
});
