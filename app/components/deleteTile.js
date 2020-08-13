import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { UpdateRecord, DeleteRecord } from '../actions/records';

const DeleteTile = (props) => {
    const restore = () => {
        const { navigation, dispatch, ...rest } = props;
        dispatch(UpdateRecord({ ...rest, deleted: false }, dispatch));
    };

    const deleteRecord = () => {
        const { dispatch, id } = props;
        dispatch(DeleteRecord(id, dispatch));
    };

    return (
        <>
            {props.deleted && (
                <View style={styles.container}>
                    <View style={{ margin: 10 }}>
                        <Text>Name: </Text>
                        <View style={styles.valueBox()}>
                            <Text>{props.fullName}</Text>
                        </View>
                    </View>
                    <View style={{ margin: 10 }}>
                        <Text>Address: </Text>
                        <View style={styles.valueBox(40)}>
                            <Text>{`${props.address}, ${props.suburbArea}, ${props.country}`}</Text>
                        </View>
                    </View>
                    <View style={styles.footer}>
                        <TouchableOpacity
                            onPress={restore}
                            style={{
                                ...styles.button,
                                backgroundColor: 'green',
                            }}>
                            <Text style={styles.buttonText}>Restore</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={deleteRecord}
                            style={{
                                ...styles.button,
                                backgroundColor: 'red',
                            }}>
                            <Text style={styles.buttonText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </>
    );
};

export default DeleteTile;

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
        width: '50%',
        justifyContent: 'center',
    },
    buttonText: { alignSelf: 'center' },
});
