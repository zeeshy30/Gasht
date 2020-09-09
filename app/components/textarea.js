import React from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';

export default (props) => {
    return (
        <View style={styles.wrapper}>
            {props.label && <Text style={styles.label}>{props.label}:</Text>}
            <View style={styles.textAreaContainer}>
                <View style={styles.box}>
                    {props.icon}
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
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        marginVertical: 10,
    },
    box: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 30,
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
        alignSelf: 'center',
        textAlignVertical: 'top',
        width: '90%',
        height: 150,
        borderRadius: 5,
        paddingRight: 10,
        fontSize: 16,
    },
    inputBox: {
        width: '90%',
        height: 50,
        borderRadius: 5,
        fontSize: 16,
        alignSelf: 'center',
    },
});
