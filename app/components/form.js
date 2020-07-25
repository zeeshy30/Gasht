import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const Form = React.forwardRef((props, ref) => {
    return (
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
    );
});

export default Form;

Form.displayName = 'Form';

Form.defaultProps = {
    secureTextEntry: false,
    onSubmitEditing: () => {},
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
        backgroundColor: '#F2F3F4',
        opacity: 0.5,
        fontWeight: 'bold',
    },
    inputBox: {
        width: 300,
        height: 50,
        borderRadius: 5,
        paddingHorizontal: 16,
        backgroundColor: '#F2F3F4',
        fontSize: 16,
        marginVertical: 10,
    },
});
