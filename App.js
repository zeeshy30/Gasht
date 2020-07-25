/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import InitialScreen from './app/screens/initialScreen';
import Login from './app/screens/login';
import Register from './app/screens/register';
import ForgotPassword from './app/screens/forgotPassword';
import Home from './app/screens/home';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerTitleStyle: { alignSelf: 'center' },
                    headerTintColor: 'white',
                    headerStyle: {
                        backgroundColor: 'green',
                    },
                }}>
                <Stack.Screen
                    name="initialscreen"
                    component={InitialScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="login"
                    component={Login}
                    options={{
                        title: 'Login',
                        headerLeft: null,
                    }}
                />
                <Stack.Screen
                    name="register"
                    component={Register}
                    options={{
                        title: 'Register',
                    }}
                />
                <Stack.Screen
                    name="forgotpassword"
                    component={ForgotPassword}
                    options={{
                        title: 'Forgot Password',
                    }}
                />
                <Stack.Screen
                    name="home"
                    component={Home}
                    options={Home.navigationOptions}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
