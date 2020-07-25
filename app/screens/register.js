import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

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

    SignUp = () => {
        const {
            fullName,
            email,
            password,
            confirmPassword,
            localAdmin,
        } = this.state;

        if (password !== confirmPassword) {
            // Alert.alert("Passwords don't match.");
            return;
        }
        if (
            fullName === '' ||
            localAdmin === '' ||
            email === '' ||
            password === '' ||
            confirmPassword === ''
        ) {
            // Alert.alert('Please fill all the fields.');
            return;
        }

        this.setState({ processing: true });

        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(async (res) => {
                res.user.updateProfile({
                    displayName: fullName,
                });
                try {
                    await firebase
                        .firestore()
                        .collection('Users')
                        .doc(res.user.uid)
                        .set({
                            email,
                            fullName,
                            adminEmail: localAdmin,
                        });
                    if (firebase.auth().currentUser) {
                        console.log('userlogggrerin');
                        await firebase.auth().signOut();
                    } else {
                        console.log('no user logged in');
                    }
                    this.props.navigation.navigate('login');
                } catch (err) {
                    this.setState({ processing: false });
                    console.log(err);
                    // Alert.alert(err);
                }
            })
            .catch((error) => {
                this.setState({ processing: false });
                // Alert.alert(error);
                console.log(error);
            });
    };

    render() {
        return (
            <>
                {this.state.processing ? (
                    <LoadingScreen />
                ) : (
                    <View style={styles.container}>
                        <View style={styles.formContainer}>
                            <Text>{'\n'}</Text>
                            <Logo />
                            <Form
                                placeholder="Full Name"
                                onUpdate={(val) =>
                                    this.setState({ fullName: val })
                                }
                                onSubmitEditing={() => this.email.focus()}
                                value={this.state.fullName}
                            />
                            <Form
                                placeholder="Email"
                                onUpdate={this.setEmail}
                                onSubmitEditing={() => this.password.focus()}
                                ref={(input) => (this.email = input)}
                                keyboardType="email-address"
                                value={this.state.email}
                            />
                            <Form
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
                                placeholder="Confirm Password"
                                secureTextEntry={true}
                                onUpdate={(val) =>
                                    this.setState({ confirmPassword: val })
                                }
                                ref={(input) => (this.confirmPassword = input)}
                                onSubmitEditing={() => this.localAdmin.focus()}
                                value={this.state.confirmPassword}
                            />
                            <Form
                                placeholder="Local Admin Email"
                                onUpdate={(val) =>
                                    this.setState({ localAdmin: val })
                                }
                                ref={(input) => (this.localAdmin = input)}
                                value={this.state.localAdmin}
                                keyboardType="email-address"
                            />
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
