import React from 'react';
import { StyleSheet, TextInput, View, Text, Image } from 'react-native';

const Form = React.forwardRef((props, ref) => {
    return (
        <View style={styles.wrapper}>
            {props.label && <Text style={styles.label}> {props.label}:</Text>}
            <View style={styles.box}>
                <View style={styles.image}>{props.icon}</View>
                <TextInput
                    style={styles.inputBox}
                    onChangeText={(text) => props.onUpdate(text)}
                    placeholder={props.placeholder}
                    placeholderTextColor={'#bcbcbc'}
                    secureTextEntry={props.secureTextEntry}
                    selectionColor="#aaa"
                    keyboardType={props.keyboardType || 'default'}
                    onSubmitEditing={props.onSubmitEditing}
                    value={props.value}
                    ref={ref}
                />
            </View>
        </View>
    );
});

export default Form;

Form.displayName = 'Form';

Form.defaultProps = {
    secureTextEntry: false,
    onSubmitEditing: () => {},
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
        alignItems: 'center',
        alignSelf: 'center',
        paddingHorizontal: 16,
        borderWidth: 1,
        borderRadius: 40,
        borderColor: 'green',
    },
    image: {
        height: '100%',
        width: '8%',
        paddingTop: 13,
        borderRightWidth: 1,
        borderColor: 'green',
    },
    label: {
        marginLeft: '5%',
        fontSize: 16,
    },
    inputBox: {
        width: '92%',
        fontSize: 16,
        alignSelf: 'center',
    },
});
