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
import AddAddress from './app/screens/addAddress';
import Records from './app/screens/records';
import LocalAdminPanel from './app/screens/localAdminPanel';
import AdminPanel from './app/screens/adminPanel';
import DeletedRecords from './app/screens/deletedRecords';
import SignupRequests from './app/screens/SignupRequests';
import ListUsers from './app/screens/listUsers';

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
                    options={({ route }) => ({
                        title: route.params.title,
                    })}
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
                <Stack.Screen
                    name="addAddress"
                    component={AddAddress}
                    options={({ route }) => ({
                        title: route.params.title,
                    })}
                />
                <Stack.Screen
                    name="records"
                    component={Records}
                    options={{
                        title: 'Gasht Records',
                    }}
                />
                <Stack.Screen
                    name="localAdminPanel"
                    component={LocalAdminPanel}
                    options={{
                        title: 'Local Admin Panel',
                    }}
                />
                <Stack.Screen
                    name="adminPanel"
                    component={AdminPanel}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="deletedRecords"
                    component={DeletedRecords}
                    options={{
                        title: 'Recycle Deleted Addresses',
                    }}
                />
                <Stack.Screen
                    name="signupRequests"
                    component={SignupRequests}
                    options={{
                        title: 'Signup Requests',
                    }}
                />
                <Stack.Screen
                    name="listUsers"
                    component={ListUsers}
                    options={{
                        title: 'List Users',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
