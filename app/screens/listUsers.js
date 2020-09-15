import React, { Component } from 'react';
import { ScrollView, RefreshControl, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import LoadingScreen from '../components/loader';
import SignupReqTile from '../components/signupReqTile';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

class UsersList extends Component {
    state = {
        localAdminList: [],
        loading: true,
    };

    componentDidMount() {
        this.fetchLocalAdmins();
    }

    fetchLocalAdmins = async () => {
        this.setState({ loading: true });
        const localAdminListSnapshots = await firebase
            .firestore()
            .collection('Users')
            .where('adminEmail', '==', this.props.user.email)
            .get();

        let localAdminList = [];
        localAdminListSnapshots.forEach((doc) => {
            const record = doc.data();
            localAdminList.push(record);
        });

        localAdminList = localAdminList.filter(
            (localAdmin) => !(!localAdmin.approved && !localAdmin.disapproved),
        );

        this.setState({ loading: false, localAdminList });
    };
    render() {
        return !this.props.user ? (
            <LoadingScreen />
        ) : (
            <ScrollView
                style={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.loading}
                        onRefresh={this.fetchLocalAdmins}
                    />
                }>
                {this.state.localAdminList.map((localAdmin) => {
                    return (
                        <SignupReqTile
                            {...localAdmin}
                            key={localAdmin.email}
                            isAdmin={this.props.user.isAdmin}
                            readOnly
                        />
                    );
                })}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
    },
});

const mapStateToProps = (state) => {
    return { user: state.auth.user };
};

export default connect(mapStateToProps)(UsersList);
