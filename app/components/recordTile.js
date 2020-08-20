import React, { useState } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Alert,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import Spinner from 'react-native-loading-spinner-overlay';

import { UpdateRecord } from '../actions/records';
import { ConfirmDialog } from 'react-native-simple-dialogs';

const RecordTile = (props) => {
    const [isImportant, setIsImportant] = useState(props.important);
    const [lastVisitedDate, setLastVisitedDate] = useState(
        props.lastVisitedDate,
    );
    const [showDialog, setShowDialog] = useState(false);

    const edit = () => {
        const { navigation, dispatch, findNearby, ...rest } = props;
        navigation.navigate('addAddress', { ...rest, title: 'Update Record' });
    };

    const remove = () => {
        const { navigation, findNearby, dispatch, ...rest } = props;
        dispatch(UpdateRecord({ ...rest, deleted: true }, dispatch));
        setShowDialog(false);
    };

    const updateLastVisited = async () => {
        const date = new Date();
        try {
            const now = `${date.getDate()}-${
                date.getMonth() + 1
            }-${date.getFullYear()}`;

            const { navigation, findNearby, dispatch, ...rest } = props;

            await dispatch(
                UpdateRecord({ ...rest, lastVisitedDate: now }, dispatch),
            );
            setLastVisitedDate(now);
        } catch (err) {
            Alert.alert(err);
        }
    };

    const updateImportant = () => {
        setIsImportant(!isImportant);
        const { navigation, findNearby, dispatch, ...rest } = props;
        dispatch(UpdateRecord({ ...rest, important: !isImportant }, dispatch));
    };

    return (
        <>
            {!props.deleted ? (
                <View style={styles.container}>
                    <ConfirmDialog
                        message="Are you sure?"
                        visible={showDialog}
                        onTouchOutside={() => setShowDialog(false)}
                        positiveButton={{
                            title: 'Yes',
                            onPress: remove,
                        }}
                        negativeButton={{
                            title: 'No',
                            onPress: () => setShowDialog(false),
                        }}
                    />
                    <Spinner
                        visible={props.updating}
                        textContent={'Updating...'}
                        textStyle={styles.spinnerTextStyle}
                    />
                    <View style={styles.left}>
                        <View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}>
                                <Text>Name: </Text>
                                <CheckBox
                                    style={{
                                        width: 100,
                                    }}
                                    onClick={updateImportant}
                                    isChecked={isImportant}
                                    rightText={'Potential*'}
                                />
                            </View>
                            <View style={styles.valueBox()}>
                                <Text>{props.fullName}</Text>
                            </View>
                        </View>
                        <View>
                            <Text>Nationality/Language: </Text>
                            <View style={styles.valueBox()}>
                                <Text>{props.nationality}</Text>
                            </View>
                        </View>
                        <View>
                            <Text>Address: </Text>
                            <View style={styles.valueBox(60)}>
                                <Text>{`${props.address}, ${props.suburbArea}, ${props.country}`}</Text>
                            </View>
                        </View>
                        <View>
                            <Text>Suburbs: </Text>
                            <View style={styles.valueBox(40)}>
                                <Text>{`${props.suburbArea}`}</Text>
                            </View>
                            <Text style={{ alignSelf: 'flex-end' }}>
                                Zone/Pocket: {props.zonePocket}
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => props.findNearby(props.id)}>
                            <Text style={styles.buttonText}>
                                Find Nearby Address
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.right}>
                        <View>
                            <Text>Last Visited:</Text>
                            <View style={styles.valueBox()}>
                                <Text>{lastVisitedDate}</Text>
                            </View>
                        </View>
                        <View>
                            <Text>Notes:</Text>
                            <ScrollView style={styles.valueBox(130)}>
                                <Text>{props.notes}</Text>
                            </ScrollView>
                        </View>
                        <View>
                            <Text>Quick Input</Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                }}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={updateLastVisited}>
                                    <Text style={styles.buttonText}>
                                        Visited Today
                                    </Text>
                                    {/* {() => this.props.navigation.navigate('records')} */}
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button}>
                                    <Text style={styles.buttonText}>
                                        NAH Today
                                    </Text>
                                    {/* {() => this.props.navigation.navigate('records')} */}
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                }}>
                                <TouchableOpacity
                                    style={{
                                        ...styles.button,
                                        backgroundColor: '#FCD12A',
                                    }}
                                    onPress={edit}>
                                    <Text style={styles.buttonText}>Edit</Text>
                                    {/* {() => this.props.navigation.navigate('records')} */}
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        ...styles.button,
                                        backgroundColor: '#E12901',
                                    }}
                                    onPress={() => setShowDialog(true)}>
                                    <Text style={styles.buttonText}>
                                        Delete
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            ) : (
                <View />
            )}
        </>
    );
};

export default RecordTile;

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
        width: '100%',
        height: 340,
        backgroundColor: '#74B72E',
        borderRadius: 10,
        flexDirection: 'row',
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
    right: {
        height: '100%',
        width: '55%',
        paddingTop: 5,
        paddingHorizontal: 10,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'space-evenly',
    },
    valueBox: (boxHeight) => ({
        backgroundColor: 'white',
        height: boxHeight || 25,
        borderRadius: 3,
        padding: 2,
    }),
    button: {
        height: 24,
        padding: 4,
        minWidth: '40%',
        backgroundColor: 'grey',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 3,
    },
    buttonText: { alignSelf: 'center' },
    spinnerTextStyle: {
        color: '#FFF',
    },
});
