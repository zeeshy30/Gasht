import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
    Image,
} from 'react-native';

import LoadingScreen from '../components/loader';
import Form from '../components/form';
import Button from '../components/button';
import Logo from '../components/logo';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            processing: false,
            registerMosque: this.props.route.params.registerMosque,
            masjid: '',
            masjidAddress: '',
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            localAdmin: '',
        };
    }

    setEmail = (val) => {
        this.setState({ email: val });
    };

    setPassword = (val) => {
        this.setState({ password: val });
    };

    registerMasjid = async () => {
        const {
            masjid,
            masjidAddress,
            fullName,
            email,
            password,
            confirmPassword,
        } = this.state;

        if (password !== confirmPassword) {
            Alert.alert("Passwords don't match.");
            return;
        }
        if (
            masjid === '' ||
            masjidAddress === '' ||
            fullName === '' ||
            email === '' ||
            password === '' ||
            confirmPassword === ''
        ) {
            Alert.alert('Please fill all the fields.');
            return;
        }

        this.setState({ processing: true });

        try {
            const res = await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password);

            await firebase
                .firestore()
                .collection('Users')
                .doc(res.user.uid)
                .set({
                    email: email.toLowerCase(),
                    fullName,
                    masjid,
                    masjidAddress,
                    isLocalAdmin: true,
                    adminEmail: 'zee@gmail.com',
                    approved: false,
                    disapproved: false,
                });

            if (firebase.auth().currentUser) {
                await firebase.auth().signOut();
            }
            this.props.navigation.navigate('login');
        } catch (err) {
            this.setState({ processing: false });
            Alert.alert(err);
        }
    };

    SignUp = async () => {
        if (this.state.registerMosque) {
            this.registerMasjid();
            return;
        }
        const {
            fullName,
            email,
            password,
            confirmPassword,
            localAdmin,
        } = this.state;

        if (password !== confirmPassword) {
            Alert.alert("Passwords don't match.");
            return;
        }
        if (
            fullName === '' ||
            localAdmin === '' ||
            email === '' ||
            password === '' ||
            confirmPassword === ''
        ) {
            Alert.alert('Please fill all the fields.');
            return;
        }
        this.setState({ processing: true });
        try {
            const adminSnapshot = await firebase
                .firestore()
                .collection('Users')
                .where('email', '==', localAdmin.toLowerCase())
                .get();

            const admins = [];
            adminSnapshot.forEach((admin) => {
                admins.push(admin.data());
            });

            if (
                !admins.length ||
                (!admins[0].isLocalAdmin && !admins[0].isAdmin)
            ) {
                this.setState({ processing: false });
                Alert.alert('Invalid admin email');
                return;
            }

            const res = await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password);

            await firebase
                .firestore()
                .collection('Users')
                .doc(res.user.uid)
                .set({
                    email: email.toLowerCase(),
                    fullName,
                    adminEmail: localAdmin.toLowerCase(),
                    masjid: admins[0].masjid,
                    masjidAddress: admins[0].masjidAddress,
                    approved: false,
                });
            if (firebase.auth().currentUser) {
                await firebase.auth().signOut();
            }
            this.props.navigation.navigate('login');
        } catch (err) {
            this.setState({ processing: false });
            Alert.alert(err);
        }
    };

    render() {
        const { registerMosque } = this.state;
        return (
            <>
                {this.state.processing ? (
                    <LoadingScreen />
                ) : (
                    <View style={styles.container}>
                        <View style={styles.formContainer}>
                            <Text>{'\n'}</Text>
                            <Logo />
                            {registerMosque && (
                                <Form
                                    icon={
                                        <Image
                                            source={require('../../icons/masjid.png')}
                                            style={{
                                                marginRight: 5,
                                                alignSelf: 'center',
                                            }}
                                            height={20}
                                            width={20}
                                        />
                                    }
                                    placeholder="Masjid Name"
                                    onUpdate={(val) =>
                                        this.setState({ masjid: val })
                                    }
                                    ref={(input) => (this.masjid = input)}
                                    value={this.state.masjid}
                                    onSubmitEditing={() =>
                                        this.masjidAddress.focus()
                                    }
                                    keyboardType="email-address"
                                />
                            )}
                            {registerMosque && (
                                <Form
                                    icon={
                                        <Image
                                            source={require('../../icons/masjidAddress.png')}
                                            style={{
                                                marginRight: 5,
                                                alignSelf: 'center',
                                            }}
                                            height={20}
                                            width={20}
                                        />
                                    }
                                    placeholder="Masjid Address"
                                    onUpdate={(val) =>
                                        this.setState({ masjidAddress: val })
                                    }
                                    ref={(input) =>
                                        (this.masjidAddress = input)
                                    }
                                    onSubmitEditing={() =>
                                        this.fullName.focus()
                                    }
                                    value={this.state.masjidAddress}
                                    keyboardType="email-address"
                                />
                            )}
                            <Form
                                icon={
                                    <Image
                                        source={require('../../icons/name.png')}
                                        style={{
                                            marginRight: 5,
                                            alignSelf: 'center',
                                        }}
                                        height={20}
                                        width={20}
                                    />
                                }
                                placeholder="Full Name"
                                onUpdate={(val) =>
                                    this.setState({ fullName: val })
                                }
                                ref={(input) => (this.fullName = input)}
                                onSubmitEditing={() => this.email.focus()}
                                value={this.state.fullName}
                            />
                            <Form
                                icon={
                                    <Image
                                        source={require('../../icons/email.png')}
                                        style={{
                                            marginRight: 5,
                                            alignSelf: 'center',
                                        }}
                                        height={20}
                                        width={20}
                                    />
                                }
                                placeholder="Email"
                                onUpdate={this.setEmail}
                                onSubmitEditing={() => this.password.focus()}
                                ref={(input) => (this.email = input)}
                                keyboardType="email-address"
                                value={this.state.email}
                            />
                            <Form
                                icon={
                                    <Image
                                        source={require('../../icons/password.png')}
                                        style={{
                                            marginRight: 5,
                                            alignSelf: 'center',
                                        }}
                                        height={20}
                                        width={20}
                                    />
                                }
                                placeholder="Password"
                                secureTextEntry={true}
                                onUpdate={this.setPassword}
                                onSubmitEditing={() =>
                                    this.confirmPassword.focus()
                                }
                                ref={(input) => (this.password = input)}
                                value={this.state.password}
                            />
                            <Form
                                icon={
                                    <Image
                                        source={require('../../icons/password.png')}
                                        style={{
                                            marginRight: 5,
                                            alignSelf: 'center',
                                        }}
                                        height={20}
                                        width={20}
                                    />
                                }
                                placeholder="Confirm Password"
                                secureTextEntry={true}
                                onUpdate={(val) =>
                                    this.setState({ confirmPassword: val })
                                }
                                ref={(input) => (this.confirmPassword = input)}
                                onSubmitEditing={() =>
                                    !registerMosque && this.localAdmin.focus()
                                }
                                value={this.state.confirmPassword}
                            />
                            {!registerMosque && (
                                <Form
                                    icon={
                                        <Image
                                            source={require('../../icons/email.png')}
                                            style={{
                                                marginRight: 5,
                                                alignSelf: 'center',
                                            }}
                                            height={20}
                                            width={20}
                                        />
                                    }
                                    placeholder="Local Admin Email"
                                    onUpdate={(val) =>
                                        this.setState({ localAdmin: val })
                                    }
                                    ref={(input) => (this.localAdmin = input)}
                                    value={this.state.localAdmin}
                                    keyboardType="email-address"
                                />
                            )}
                        </View>
                        <Button onPress={this.SignUp} text="Sign up" />

                        <View style={styles.signupTextCont}>
                            <Text style={styles.signupText}>
                                Already have an account?{' '}
                            </Text>
                            <TouchableOpacity
                                onPress={() =>
                                    this.props.navigation.navigate('login')
                                }>
                                <Text style={styles.signupButton}>Sign in</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </>
        );
    }
}

const styles = StyleSheet.create({
    formContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    button: {
        width: 300,
        backgroundColor: 'green',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center',
    },
    forgotPassword: {
        color: 'green',
        fontSize: 16,
        fontWeight: '500',
        paddingBottom: 16,
    },
    signupTextCont: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingTop: 16,
        flexDirection: 'row',
        marginBottom: 16,
    },
    signupText: {
        color: 'green',
        fontSize: 16,
    },
    signupButton: {
        color: 'green',
        fontSize: 16,
        fontWeight: '500',
    },
});
