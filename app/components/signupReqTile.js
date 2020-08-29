import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const SignupReqTile = (props) => {
    return (
        <>
            <View style={styles.container}>
                <View style={{ margin: 10 }}>
                    <Text>Name: </Text>
                    <View style={styles.valueBox()}>
                        <Text>{props.fullName}</Text>
                    </View>
                </View>
                <View style={{ margin: 10 }}>
                    <Text>Email: </Text>
                    <View style={styles.valueBox()}>
                        <Text>{props.email}</Text>
                    </View>
                </View>
                <View style={styles.footer}>
                    {/* <TouchableOpacity
                        // onPress={restore}
                        style={{
                            ...styles.button,
                            backgroundColor: 'red',
                        }}>
                        <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity
                        onPress={() => props.approveUser(props.id)}
                        style={{
                            ...styles.button,
                            backgroundColor: 'green',
                        }}>
                        <Text style={styles.buttonText}>Approve</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

export default SignupReqTile;

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
        width: '100%',
        backgroundColor: '#74B72E',
        borderRadius: 2,
        justifyContent: 'center',
    },
    left: {
        width: '45%',
        borderRightWidth: 1,
        height: '100%',
        paddingTop: 10,
        paddingHorizontal: 10,
        justifyContent: 'space-evenly',
        paddingBottom: 25,
    },
    footer: {
        flexDirection: 'row',
    },
    valueBox: (boxHeight) => ({
        backgroundColor: 'white',
        height: boxHeight || 25,
        borderRadius: 3,
        padding: 2,
    }),
    button: {
        height: 24,
        backgroundColor: 'grey',
        width: '100%',
        justifyContent: 'center',
    },
    buttonText: {
        alignSelf: 'center',
        color: 'white',
    },
});
