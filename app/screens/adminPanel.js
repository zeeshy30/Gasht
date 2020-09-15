import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItem,
} from '@react-navigation/drawer';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';

import AdminSignupRequests from './adminSignupRequests';
import LocalAdminsList from './localAdminsList';
import { Logout } from '../actions/auth';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
    const { navigate } = props.navigation;

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItem
                label="Signup Requests"
                onPress={() => {
                    navigate('Signup Requests');
                }}
            />
            <DrawerItem
                label="Local Admins"
                onPress={() => {
                    navigate('localAdminsList');
                }}
            />
            <DrawerItem
                label="Log Out"
                onPress={() => {
                    firebase
                        .auth()
                        .signOut()
                        .then(() => {
                            props.dispatch(Logout(props.dispatch));
                            props.navigation
                                .dangerouslyGetParent()
                                .navigate('login');
                        });
                }}
            />
        </DrawerContentScrollView>
    );
}

function AdminPanel(props) {
    return (
        <Drawer.Navigator
            hideStatusBar={false}
            drawerContent={(prop) => (
                <CustomDrawerContent {...props} {...prop} />
            )}>
            <Drawer.Screen
                name="Signup Requests"
                component={AdminSignupRequests}
            />
            <Drawer.Screen name="localAdminsList" component={LocalAdminsList} />
        </Drawer.Navigator>
    );
}

export default connect()(AdminPanel);
