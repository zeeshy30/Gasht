import React from 'react';
import { View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';

import LoadingScreen from '../components/loader';
import SignupRequests from './SignupRequests';

const Stack = createStackNavigator();

class AdminSignupRequests extends React.Component {
    componentDidMount() {
        this.props.navigation.closeDrawer();
    }

    render() {
        return this.props.user ? (
            <Stack.Navigator
                screenOptions={{
                    headerTitleStyle: { alignSelf: 'center' },
                    headerTintColor: 'white',
                    headerStyle: {
                        backgroundColor: 'green',
                    },
                }}>
                <Stack.Screen
                    name="SignupRequests"
                    component={SignupRequests}
                    options={{
                        title: 'Signup Requests',
                        headerLeft: () => (
                            <View style={{ marginLeft: 5 }}>
                                <Feather
                                    name="menu"
                                    color="white"
                                    size={25}
                                    onPress={() =>
                                        this.props.navigation.toggleDrawer()
                                    }
                                />
                            </View>
                        ),
                    }}
                />
            </Stack.Navigator>
        ) : (
            <LoadingScreen />
        );
    }
}

const mapStateToProps = (state) => {
    return { user: state.auth.user, records: state.records };
};

export default connect(mapStateToProps)(AdminSignupRequests);
