import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import RecordTile from '../components/recordTile';
import LoadingScreen from '../components/loader';
import { connect } from 'react-redux';

class Records extends Component {
    state = {
        findNearby: false,
        processing: false,
        id: null,
    };

    getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the earth in km
        const dLat = this.deg2rad(lat2 - lat1); // deg2rad below
        const dLon = this.deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) *
                Math.cos(this.deg2rad(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        return d;
    };

    deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    };

    findNearby = (id) => {
        // this.setState({ processing: true });
        const filtered = Object.keys(this.props.records.data).filter(
            (record) => {
                if (record === id) {
                    return true;
                } else {
                    const { latitude, longitude } = this.props.records.data[
                        record
                    ];
                    return (
                        this.getDistanceFromLatLonInKm(
                            this.props.records.data[id].latitude,
                            this.props.records.data[id].longitude,
                            latitude,
                            longitude,
                        ) <= 1
                    );
                }
            },
        );
        // this.setState({ processing: false });
        return filtered;
    };

    filterByName = (name) => {
        const filtered = Object.keys(this.props.records.data).filter(
            (record) => {
                return this.props.records.data[record].fullName
                    .split(' ')
                    .join('')
                    .toLowerCase()
                    .includes(name.split(' ').join('').toLowerCase());
            },
        );
        return filtered;
    };

    filterByLocation = (location) => {
        const filtered = Object.keys(this.props.records.data).filter(
            (record) => {
                const address = `${this.props.records.data[record].address}
                ${this.props.records.data[record].suburbArea}
                ${this.props.records.data[record].country}`;
                return address
                    .split(' ')
                    .join('')
                    .split(',')
                    .join()
                    .toLowerCase()
                    .includes(
                        location
                            .split(' ')
                            .join('')
                            .split(',')
                            .join()
                            .toLowerCase(),
                    );
            },
        );
        return filtered;
    };

    render() {
        const nameFiltered = this.filterByName(
            this.props.route.params.filterName,
        );
        const locationFiltered = this.filterByLocation(
            this.props.route.params.filterAddress,
        );
        let displayRecords = this.state.findNearby
            ? this.findNearby(this.state.id)
            : nameFiltered.filter((value) => locationFiltered.includes(value));

        displayRecords = displayRecords.filter(
            (record) => !this.props.records.data[record].deleted,
        );

        return (
            <ScrollView style={styles.container}>
                {this.state.processing ? (
                    <LoadingScreen />
                ) : (
                    <>
                        {this.props.records.loaded &&
                            displayRecords.map((record) => {
                                return (
                                    <RecordTile
                                        key={record}
                                        dispatch={this.props.dispatch}
                                        {...this.props.records.data[record]}
                                        updating={this.props.records.updating}
                                        id={record}
                                        navigation={this.props.navigation}
                                        findNearby={(id) =>
                                            this.setState(
                                                { processing: true },
                                                () => {
                                                    setTimeout(() => {
                                                        this.setState({
                                                            findNearby: true,
                                                            processing: false,
                                                            id,
                                                        });
                                                    }, 500);
                                                },
                                            )
                                        }
                                    />
                                );
                            })}
                    </>
                )}
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    return { records: state.records };
};

export default connect(mapStateToProps)(Records);

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
    },
});
