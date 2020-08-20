import React, { Component } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Button,
    Alert,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Form from '../components/form';
import LoadingScreen from '../components/loader';
import { connect } from 'react-redux';
import { LoadRecords } from '../actions/records';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            processing: false,
            records: [],
            filterName: '',
            filterAddress: '',
        };
    }

    componentDidMount() {
        const user = firebase.auth().currentUser;
        if (!user) {
            this.props.navigation.navigate('login');
        } else {
            this.getRecords();
        }
    }

    getRecords = () => {
        this.props.dispatch(LoadRecords(this.props.dispatch));
    };

    static navigationOptions = (props) => {
        const logout = async () => {
            try {
                await firebase.auth().signOut();
                props.navigation.navigate('login');
            } catch (err) {
                Alert.alert(err);
            }
        };

        return {
            header: () => (
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.title}>Gasht</Text>
                        <TouchableOpacity onPress={logout}>
                            <Text style={styles.logout}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.addAddressWrapper}
                        onPress={() =>
                            props.navigation.navigate('addAddress', {
                                title: 'Add Record',
                            })
                        }>
                        <Entypo name="plus" size={20} color="white" />
                        <Text style={styles.addAddress}>Add Address</Text>
                    </TouchableOpacity>
                </View>
            ),
        };
    };

    logout = async () => {
        this.setState({ processing: true });
        try {
            await firebase.auth().signOut();
            this.props.navigation.navigate('login');
        } catch (err) {
            this.setState({ processing: false });
            Alert.alert(err);
        }
    };

    search = () => {
        this.props.navigation.navigate('records', {
            filterName: this.state.filterName,
            filterAddress: this.state.filterAddress,
        });
    };

    render() {
        return this.props.records.loading || !this.props.records.loaded ? (
            <LoadingScreen />
        ) : (
            <ScrollView style={styles.container}>
                <View style={styles.masjidDetails}>
                    <Text style={styles.masjidName}>
                        {this.props.user.masjid}
                    </Text>
                    <Text style={styles.address}>Address of the Masjid</Text>
                </View>
                <Text style={styles.recordNum}>Gasht Records</Text>
                <Text style={styles.recordNum}>
                    Total Records ={' '}
                    {
                        Object.keys(this.props.records.data).filter(
                            (record) =>
                                !this.props.records.data[record].deleted,
                        ).length
                    }
                </Text>
                <View>
                    <Text style={styles.filter}>Filter</Text>
                    <View style={styles.form}>
                        <Text style={styles.label}>Name:</Text>
                        <Form
                            placeholder="Name"
                            onUpdate={(val) =>
                                this.setState({ filterName: val })
                            }
                            value={this.state.filterName}
                        />
                    </View>
                    <View style={styles.form}>
                        <Text style={styles.label}>Address:</Text>
                        <Form
                            placeholder="Address"
                            onUpdate={(val) =>
                                this.setState({ filterAddress: val })
                            }
                            value={this.state.filterAddress}
                        />
                    </View>
                    <View style={styles.searchBox}>
                        <Button
                            color="green"
                            title="Search"
                            onPress={this.search}
                        />
                    </View>
                    {this.props.user.isLocalAdmin && (
                        <View style={styles.adminButton}>
                            <Button
                                color="green"
                                title="Open Admin Panel"
                                onPress={() =>
                                    this.props.navigation.navigate(
                                        'localAdminPanel',
                                    )
                                }
                            />
                        </View>
                    )}
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    return { user: state.auth.user, records: state.records };
};

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        paddingHorizontal: 15,
    },
    header: {
        justifyContent: 'space-between',
        backgroundColor: 'green',
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
    },
    headerButton: {
        height: 40,
    },
    headerLeft: {
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    title: {
        fontSize: 28,
        color: 'white',
    },
    logout: {
        fontSize: 15,
        alignSelf: 'flex-end',
        textDecorationLine: 'underline',
        color: 'white',
    },
    searchBox: {
        backgroundColor: 'green',
        width: 100,
        alignSelf: 'center',
        marginBottom: 10,
        borderRadius: 15,
    },
    addAddressWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    addAddress: {
        fontSize: 16,
        color: 'white',
    },
    masjidName: {
        fontSize: 35,
        marginTop: 20,
        // marginBottom: 50,
    },
    address: {
        fontSize: 16,
    },
    masjidDetails: {
        marginBottom: 50,
    },
    recordNum: {
        fontSize: 25,
        marginBottom: 20,
    },
    filter: {
        fontSize: 35,
        marginBottom: 15,
        marginTop: 50,
    },
    form: {
        flexDirection: 'row',
    },
    label: {
        fontSize: 18,
        alignSelf: 'center',
        // marginRight: 20,
    },
});
