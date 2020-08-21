import React from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

const Form = React.forwardRef((props, ref) => {
    return (
        // <View style={styles.searchSection}>
        //     <Icon
        //         style={styles.searchIcon}
        //         name="home"
        //         size={20}
        //         color="#000"
        //     />
        <View style={styles.wrapper}>
            {props.label && <Text style={styles.label}> {props.label}:</Text>}
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
    );
});

export default Form;

Form.displayName = 'Form';

Form.defaultProps = {
    secureTextEntry: false,
    onSubmitEditing: () => {},
};

const styles = StyleSheet.create({
    // searchSection: {
    //     // flex: 1,
    //     // height: 50,
    //     flexDirection: 'row',
    //     width: '90%',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: '#f2f3f4',
    // },
    // searchIcon: {
    //     padding: 10,
    // },
    // input: {
    //     flex: 1,
    //     paddingTop: 10,
    //     paddingRight: 10,
    //     paddingBottom: 10,
    //     paddingLeft: 0,
    //     backgroundColor: '#f2f3f4',
    //     color: '#424242',
    // },
    wrapper: {
        width: '100%',
        marginVertical: 10,
    },
    label: {
        marginLeft: '5%',
        fontSize: 16,
    },
    inputBox: {
        width: '90%',
        height: 50,
        paddingHorizontal: 16,
        borderRadius: 5,
        paddingRight: 10,
        // borderWidth: 0.4,
        // borderColor: 'red',
        backgroundColor: '#F2F3F4',
        fontSize: 16,
        alignSelf: 'center',
    },
});
