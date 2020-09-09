import React, { Component } from 'react';
import { View, Image, Alert, StyleSheet } from 'react-native';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';

import LoadingScreen from '../components/loader';
import Form from '../components/form';
import Button from '../components/button';
import Logo from '../components/logo';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            loading: false,
        };
    }
    passwordReset = async () => {
        this.setState({ loading: true });
        try {
            await firebase.auth().sendPasswordResetEmail(this.state.email);
            this.setState({ loading: false });
            this.props.navigation.navigate('login');
        } catch (err) {
            this.setState({ loading: false });
            Alert.alert(err);
        }
    };

    render() {
        return this.state.loading ? (
            <LoadingScreen />
        ) : (
            <View style={styles.container}>
                <Logo />
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
                    onUpdate={(val) => this.setState({ email: val })}
                    keyboardType="email-address"
                    value={this.state.email}
                />
                <Button onPress={this.passwordReset} text="Submit" />
            </View>
        );
    }
}

export default ForgotPassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        paddingTop: 50,
        alignItems: 'center',
        backgroundColor: 'white',
    },
});
