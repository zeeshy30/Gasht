import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import DeleteTile from '../components/deleteTile';
import { connect } from 'react-redux';

const DeletedRecords = (props) => {
    const deletedRecords = Object.keys(props.records.data).filter(
        (record) => props.records.data[record].deleted,
    );

    return (
        <ScrollView style={styles.container}>
            <Spinner
                visible={props.records.updating}
                textContent={'Updating...'}
                textStyle={{ color: '#fff' }}
            />
            {deletedRecords.map((record) => (
                <DeleteTile
                    key={record}
                    dispatch={props.dispatch}
                    {...props.records.data[record]}
                    updating={props.records.updating}
                    id={record}
                />
            ))}
        </ScrollView>
    );
};

const mapStateToProps = (state) => {
    return { records: state.records };
};

export default connect(mapStateToProps)(DeletedRecords);

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
    },
});
