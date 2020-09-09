import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native';
import { connect } from 'react-redux';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';

import LoadingScreen from '../components/loader';
import Form from '../components/form';
import Button from '../components/button';
import Logo from '../components/logo';
import { Login as loginUser } from '../actions/auth';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            processing: false,
            email: '',
            password: '',
        };
    }

    componentDidUpdate() {
        if (this.props.auth.authSuccess) {
            if (this.props.auth.user.isAdmin) {
                this.props.navigation.navigate('adminPanel');
            } else {
                this.props.navigation.navigate('home');
            }
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
        this.props.navigation.navigate('register', {
            registerMosque: false,
            title: 'User Sign Up',
        });
    };

    registerMosque = () => {
        this.props.navigation.navigate('register', {
            registerMosque: true,
            title: 'Register Masjid/Center',
        });
    };

    Login = async () => {
        if (this.state.email === '' || this.state.password === '') {
            Alert.alert('Enter details to Login!');
            return;
        }

        const emailSnapShot = await firebase
            .firestore()
            .collection('Users')
            .where('email', '==', this.state.email.toLowerCase())
            .get();

        const users = [];
        emailSnapShot.forEach((admin) => {
            users.push(admin.data());
        });

        if (!users.length) {
            this.setState({ processing: false });
            Alert.alert('Invalid email');
            return;
        } else if (!users[0].approved) {
            this.setState({ processing: false });
            Alert.alert(
                'Your account has not been approved yet, Please contact your admin',
            );
            return;
        }

        this.props.dispatch(
            loginUser({
                email: this.state.email,
                password: this.state.password,
                dispatch: this.props.dispatch,
            }),
        );
    };
    render() {
        return (
            <>
                {this.props.auth.loading ? (
                    <LoadingScreen />
                ) : (
                    <View style={styles.container}>
                        <Text>{'\n'}</Text>
                        <Text>{'\n'}</Text>
                        <Logo />
                        <Text>{'\n'}</Text>
                        <Text>{'\n'}</Text>
                        <View style={styles.formContainer}>
                            <Form
                                icon={
                                    <Image
                                        source={require('../../icons/email.png')}
                                        style={
                                            {
                                                // marginRight: 5,
                                                // alignSelf: 'center',
                                            }
                                        }
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
                                        style={
                                            {
                                                // marginRight: 5,
                                                // alignSelf: 'center',
                                            }
                                        }
                                        height={20}
                                        width={20}
                                    />
                                }
                                placeholder="Password"
                                secureTextEntry={true}
                                onUpdate={this.setPassword}
                                ref={(input) => (this.password = input)}
                                value={this.state.password}
                            />
                        </View>
                        <Button onPress={this.Login} text="Login" />
                        <View style={styles.signupTextCont}>
                            <Text style={styles.signupText}>
                                Dont have an account yet?{' '}
                            </Text>
                            <TouchableOpacity onPress={this.signup}>
                                <Text style={styles.signupButton}>Signup </Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={this.registerMosque}>
                            <Text style={styles.signupButton}>
                                Register Masjid
                            </Text>
                        </TouchableOpacity>
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

const mapStateToProps = (state) => {
    return { auth: state.auth };
};

export default connect(mapStateToProps)(Login);

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
