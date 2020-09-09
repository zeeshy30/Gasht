import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Alert, Image } from 'react-native';
import { connect } from 'react-redux';

import Form from '../components/form';
import Button from '../components/button';
import Textarea from '../components/textarea';
import { UpdateRecord, AddRecord } from '../actions/records';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';
import Spinner from 'react-native-loading-spinner-overlay';

class AddAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            processing: false,
            update: false,
            fullName: '',
            nationality: '',
            address: '',
            suburbArea: '',
            province: '',
            country: '',
            phoneNumber: '',
            notes: '',
            zonePocket: '',
            latitude: null,
            longitude: null,
        };
    }

    componentDidMount() {
        Geocoder.init('AIzaSyA2JF5CcJ6Thk2oEA_fglf_PJTdqzDvRpw');
        if (this.props.route.params.title === 'Update Record') {
            this.setState({
                fullName: this.props.route.params.fullName || '',
                nationality: this.props.route.params.nationality || '',
                address: this.props.route.params.address || '',
                suburbArea: this.props.route.params.suburbArea || '',
                province: this.props.route.params.province || '',
                country: this.props.route.params.country || '',
                phoneNumber: this.props.route.params.phoneNumber || '',
                notes: this.props.route.params.notes || '',
                zonePocket: this.props.route.params.zonePocket || '',
                latitude: this.props.route.params.latitude || null,
                longitude: this.props.route.params.longitude || null,
                update: true,
            });
        }
    }

    setEmail = (val) => {
        this.setState({ email: val });
    };

    setPassword = (val) => {
        this.setState({ password: val });
    };

    insert = async () => {
        const { processing, update, ...rest } = this.state;
        this.setState({ processing: true });
        if (
            rest.fullName === '' ||
            rest.nationality === '' ||
            rest.address === '' ||
            rest.suburbArea === '' ||
            rest.province === '' ||
            rest.country === '' ||
            rest.phoneNumber === '' ||
            rest.zonePocket === '' ||
            rest.notes === ''
        ) {
            Alert.alert('Error: Please fill all the fields');
            return;
        }

        if (rest.latitude === null || rest.longitude === null) {
            Alert.alert('Please enter address in "Search Location" Field');
            return;
        }

        const date = new Date();

        const record = {
            ...rest,
            important: false,
            masjid: this.props.user.masjid,
            lastVisitedDate:
                date.getDate() +
                '-' +
                (date.getMonth() + 1) +
                '-' +
                date.getFullYear(),
        };
        this.props.dispatch(AddRecord(record, this.props.dispatch));
        this.props.navigation.navigate('home');
    };

    updateLocation = (data) => {
        Geocoder.from(data.description).then((res) => {
            const address = data.description.split(',');
            const coordinates = res.results[0].geometry.location;
            this.setState({
                suburbArea: [
                    address[address.length - 3],
                    address[address.length - 2],
                ].join(','),
                country: address[address.length - 1],
                address: address.slice(0, address.length - 3).join(','),
                latitude: coordinates.lat,
                longitude: coordinates.lng,
            });
        });
    };

    update = async () => {
        const { processing, update, ...rest } = this.state;
        await this.props.dispatch(
            UpdateRecord(
                { ...rest, id: this.props.route.params.id },
                this.props.dispatch,
            ),
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <Spinner
                    visible={this.props.records.updating}
                    textContent={'Updating...'}
                    textStyle={styles.spinnerTextStyle}
                />
                <View style={styles.googlePlaces}>
                    <GooglePlacesAutocomplete
                        styles={{
                            textInputContainer: {
                                width: '90%',
                                height: 60,
                                backgroundColor: '#D6CFC7',
                                alignSelf: 'center',
                                borderWidth: 0,
                                borderTopColor: '#D6CFC7',
                                borderBottomColor: '#D6CFC7',
                            },
                            textInput: {
                                borderColor: 'white',
                                borderWidth: 0,
                                height: 40,
                                width: '90%',
                                color: '#5d5d5d',
                                backgroundColor: '#f2f3f4',
                                fontSize: 16,
                            },
                            predefinedPlacesDescription: {
                                color: '#1faadb',
                                backgroundColor: 'red',
                            },
                        }}
                        placeholder="Search Location"
                        onPress={this.updateLocation}
                        query={{
                            key: 'AIzaSyA2JF5CcJ6Thk2oEA_fglf_PJTdqzDvRpw',
                            language: 'en',
                        }}
                        renderLeftButton={() => (
                            <Image
                                source={require('../../icons/adress.png')}
                                style={{
                                    alignSelf: 'center',
                                }}
                                height={20}
                                width={20}
                            />
                        )}
                    />
                </View>
                <ScrollView
                    style={styles.formStyle}
                    contentContainerStyle={styles.contentFormStyle}>
                    <Form
                        icon={
                            <Image
                                source={require('../../icons/name.png')}
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
                        label="Full Name"
                        placeholder="Enter Name"
                        onUpdate={(val) => this.setState({ fullName: val })}
                        value={this.state.fullName}
                    />
                    <Form
                        icon={
                            <Image
                                source={require('../../icons/CountryofBirth.png')}
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
                        label="Ethnicity/Country of Birth"
                        placeholder="Enter the country of birth/origin"
                        onUpdate={(val) => this.setState({ nationality: val })}
                        value={this.state.nationality}
                    />
                    <Form
                        icon={
                            <Image
                                source={require('../../icons/adress.png')}
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
                        label="Full Address"
                        placeholder="Enter
                        Present Address"
                        onUpdate={(val) => this.setState({ address: val })}
                        value={this.state.address}
                    />
                    <Form
                        icon={
                            <Image
                                source={require('../../icons/Suburb.png')}
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
                        label="Suburb/Area"
                        placeholder="Enter Suburb/Area"
                        onUpdate={(val) => this.setState({ suburbArea: val })}
                        value={this.state.suburbArea}
                    />
                    <Form
                        icon={
                            <Image
                                source={require('../../icons/Suburb.png')}
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
                        label="Province/State/District"
                        placeholder="Enter Province/State/District"
                        onUpdate={(val) => this.setState({ province: val })}
                        value={this.state.province}
                    />
                    <Form
                        icon={
                            <Image
                                source={require('../../icons/Country.png')}
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
                        label="Country"
                        placeholder="Enter Country"
                        onUpdate={(val) => this.setState({ country: val })}
                        value={this.state.country}
                    />
                    <Form
                        icon={
                            <Image
                                source={require('../../icons/Phoneno.png')}
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
                        label="Phone Number"
                        placeholder="Enter Phone Number"
                        onUpdate={(val) => this.setState({ phoneNumber: val })}
                        value={this.state.phoneNumber}
                        keyboardType="phone-pad"
                    />
                    <Form
                        icon={
                            <Image
                                source={require('../../icons/Zone.png')}
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
                        label="Zone/Pocket"
                        placeholder="Enter Zone/Pocket"
                        onUpdate={(val) => this.setState({ zonePocket: val })}
                        value={this.state.zonePocket}
                    />
                    <Textarea
                        icon={
                            <Image
                                source={require('../../icons/Notes.png')}
                                style={{
                                    marginRight: 5,
                                    marginTop: 12,
                                }}
                                height={20}
                                width={20}
                            />
                        }
                        label="Notes"
                        placeholder="Type Notes..."
                        onUpdate={(val) => this.setState({ notes: val })}
                        value={this.state.notes}
                    />
                    <Button
                        onPress={this.state.update ? this.update : this.insert}
                        text={this.state.update ? 'Update' : 'Add'}
                    />
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return { user: state.auth.user, records: state.records };
};

export default connect(mapStateToProps)(AddAddress);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    googlePlaces: {
        width: '100%',
        position: 'absolute',
        top: 0,
        backgroundColor: '#D6CFC7',
        zIndex: 1,
    },
    formStyle: {
        marginTop: 60,
        backgroundColor: 'white',
        width: '100%',
    },
    contentFormStyle: {
        alignItems: 'center',
    },
    spinnerTextStyle: {
        color: '#FFF',
    },
});
