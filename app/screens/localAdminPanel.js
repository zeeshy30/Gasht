import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import { Actions } from 'react-native-router-flux';

const LocalAdminPanel = (props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => props.navigation.navigate('signupRequests')}>
                <Text style={styles.text}>Open New Signup Requests</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => props.navigation.navigate('deletedRecords')}>
                <Text style={styles.text}>Open Delete Address Requests</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LocalAdminPanel;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 25,
        paddingBottom: 25,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        width: 300,
        backgroundColor: 'green',
        borderRadius: 25,
        marginVertical: 25,
        alignContent: 'center',
    },
    text: {
        fontSize: 18,
        alignSelf: 'center',
        alignItems: 'center',
        alignContent: 'center',
        fontWeight: 'bold',
    },
});
