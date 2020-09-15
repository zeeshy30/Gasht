import React from 'react';
import { View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { createStackNavigator } from '@react-navigation/stack';
import UsersList from './listUsers';

const Stack = createStackNavigator();
const localAdminsListStack = (props) => (
    <Stack.Navigator
        screenOptions={{
            headerTitleStyle: { alignSelf: 'center' },
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: 'green',
            },
        }}>
        <Stack.Screen
            name="localAdminsList"
            component={UsersList}
            options={{
                title: 'Local Admins',
                headerLeft: () => (
                    <View style={{ marginLeft: 5 }}>
                        <Feather
                            name="menu"
                            color="white"
                            size={25}
                            onPress={() => props.navigation.toggleDrawer()}
                        />
                    </View>
                ),
            }}
        />
    </Stack.Navigator>
);

export default localAdminsListStack;
