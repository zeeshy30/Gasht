import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

const SignupReqTile = (props) => {
    return (
        <>
            <View
                style={styles.container(
                    props.readOnly && props.disapproved && 'red',
                )}>
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
                <View style={{ margin: 10 }}>
                    <Text>Phone Number: </Text>
                    <View style={styles.valueBox()}>
                        <Text>{props.phoneNo}</Text>
                    </View>
                </View>
                {props.isAdmin && (
                    <>
                        <View style={{ margin: 10 }}>
                            <Text>Masjid: </Text>
                            <View style={styles.valueBox()}>
                                <Text>{props.masjid}</Text>
                            </View>
                        </View>
                        <View style={{ margin: 10 }}>
                            <Text>Masjid Address: </Text>
                            <View style={styles.valueBox(40)}>
                                <Text>{props.masjidAddress}</Text>
                            </View>
                        </View>
                    </>
                )}
                {!props.readOnly && (
                    <View style={styles.footer}>
                        <TouchableOpacity
                            onPress={() => props.approveUser(props.id)}
                            style={{
                                ...styles.button,
                                backgroundColor: 'green',
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                }}>
                                <Image
                                    source={require('../../icons/Approve.png')}
                                    style={{
                                        marginRight: 5,
                                        alignSelf: 'center',
                                    }}
                                    height={13}
                                    width={13}
                                />
                                <Text style={styles.buttonText}>Approve</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => props.disapproveUser(props.id)}
                            style={{
                                ...styles.button,
                                backgroundColor: 'red',
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                }}>
                                <Image
                                    source={require('../../icons/Delete.png')}
                                    style={{
                                        marginRight: 5,
                                        alignSelf: 'center',
                                    }}
                                    height={13}
                                    width={13}
                                />
                                <Text style={styles.buttonText}>
                                    Disapprove
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </>
    );
};

export default SignupReqTile;

const styles = StyleSheet.create({
    container: (color) => ({
        marginVertical: 15,
        width: '100%',
        backgroundColor: color || '#74B72E',
        borderRadius: 2,
        justifyContent: 'center',
    }),
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
    buttonText: {
        alignSelf: 'center',
        color: 'white',
    },
});
