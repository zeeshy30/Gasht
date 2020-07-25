import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';

import LoadingScreen from '../components/loader';
import Form from '../components/form';
import Button from '../components/button';
import Logo from '../components/logo';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            processing: false,
            email: '',
            password: '',
        };
    }
    componentDidMount() {
        const user = firebase.auth().currentUser;
        if (user) {
            this.props.navigation.navigate('home');
        }
    }

    setEmail = (val) => {
        this.setState({ email: val });
    };

    setPassword = (val) => {
        this.setState({ password: val });
    };

    forgotPassword = () => {
        this.props.navigation.navigate('forgotpassword');
    };

    signup = () => {
        this.props.navigation.navigate('register');
    };

    Login = async () => {
        if (this.state.email === '' || this.state.password === '') {
            Alert.alert('Enter details to Login!');
            return;
        }
        try {
            const res = await firebase
                .auth()
                .signInWithEmailAndPassword(
                    this.state.email,
                    this.state.password,
                );
            const doc = await firebase
                .firestore()
                .collection('Users')
                .doc(res.user.uid)
                .get();
            const details = doc.data();
            details.docID = doc.id;

            // await AsyncStorage.setItem('loginDetails', JSON.stringify(details));
            this.props.navigation.navigate('home');
        } catch (err) {
            this.setState({ processing: false });
            // Alert.alert(err);
            console.log(err);
        }
    };
    render() {
        return (
            <>
                {this.state.processing ? (
                    <LoadingScreen />
                ) : (
                    <View style={styles.container}>
                        <Text>{'\n'}</Text>
                        <Text>{'\n'}</Text>
                        <Logo />
                        <View style={styles.formContainer}>
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
                                ref={(input) => (this.password = input)}
                                value={this.state.password}
                            />
                        </View>
                        <Button
                            onPress={() =>
                                this.setState({ processing: true }, this.Login)
                            }
                            text="Login"
                        />
                        <View style={styles.signupTextCont}>
                            <Text style={styles.signupText}>
                                Dont have an account yet?{' '}
                            </Text>
                            <TouchableOpacity onPress={this.signup}>
                                <Text style={styles.signupButton}>Signup</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={this.forgotPassword}>
                            <Text style={styles.forgotPassword}>
                                Forgot Password?
                            </Text>
                        </TouchableOpacity>
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
