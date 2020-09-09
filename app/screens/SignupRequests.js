import React, { useState, useEffect } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import SignupReqTile from '../components/signupReqTile';
import LoadingScreen from '../components/loader';
import { connect } from 'react-redux';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

const SignupRequests = (props) => {
    const [requests, setRequests] = useState({});
    const [processing, setProcessing] = useState(false);
    const [updating, setupdating] = useState(false);
    useEffect(() => {
        const getRequests = async () => {
            setProcessing(true);

            const requestSnapshots = props.user.isAdmin
                ? await firebase
                      .firestore()
                      .collection('Users')
                      .where('adminEmail', '==', props.user.email)
                      .where('approved', '==', false)
                      .where('disapproved', '==', false)
                      .get()
                : await firebase
                      .firestore()
                      .collection('Users')
                      .where('adminEmail', '==', props.user.email)
                      .where('approved', '==', false)
                      .get();

            const users = {};
            requestSnapshots.forEach((user) => {
                users[user.id] = user.data();
            });
            setProcessing(false);
            setRequests(users);
        };
        getRequests();
    }, [props.user.email, props.user.isAdmin]);

    const approveUser = async (id) => {
        setupdating(true);
        await firebase
            .firestore()
            .collection('Users')
            .doc(id)
            .update({ approved: true });
        const { [id]: val, ...rest } = requests;
        setRequests(rest);
        setupdating(false);
    };

    const disapproveUser = async (id) => {
        setupdating(true);
        await firebase
            .firestore()
            .collection('Users')
            .doc(id)
            .update({ disapproved: true });
        const { [id]: val, ...rest } = requests;
        setRequests(rest);
        setupdating(false);
    };

    return processing ? (
        <LoadingScreen />
    ) : (
        <ScrollView style={styles.container}>
            <Spinner
                visible={updating}
                textContent={'Updating...'}
                textStyle={styles.spinnerTextStyle}
            />
            {Object.keys(requests).length === 0 && <Text>No Requests</Text>}
            {Object.keys(requests).map((requestId) => (
                <SignupReqTile
                    {...requests[requestId]}
                    key={requestId}
                    approveUser={approveUser}
                    disapproveUser={disapproveUser}
                    isAdmin={props.user.isAdmin}
                    id={requestId}
                />
            ))}
        </ScrollView>
    );
};

const mapStateToProps = (state) => {
    return { user: state.auth.user };
};

export default connect(mapStateToProps)(SignupRequests);

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
    },
});
