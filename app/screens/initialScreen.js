import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';

import Logo from '../components/logo';
import { LoginSuccess, LoginFailed } from '../actions/auth';

class InitialScreen extends Component {
    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        const user = firebase.auth().currentUser;
        if (user) {
            try {
                const doc = await firebase
                    .firestore()
                    .collection('Users')
                    .doc(user.uid)
                    .get();
                const details = doc.data();
                this.props.dispatch(LoginSuccess(details));
                this.props.navigation.navigate('home');
            } catch (err) {
                console.log(err);
                firebase.auth().signOut();
                this.props.dispatch(LoginFailed(err));
                this.props.navigation.navigate('login');
            }
        } else {
            this.props.navigation.navigate('login');
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Logo width={120} height={120} />
                </View>
                <View>
                    <Text style={styles.poweredby}>Powered By</Text>
                    <Text style={styles.gasht}>GASHT.COM</Text>
                </View>
            </View>
        );
    }
}

export default connect()(InitialScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'white',
        // paddingTop: 150,
    },
    poweredby: {
        alignSelf: 'center',
        fontSize: 18,
    },
    gasht: {
        fontWeight: 'bold',
        fontSize: 20,
    },
});
