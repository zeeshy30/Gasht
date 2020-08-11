import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

export const ActionTypes = {
    LOAD_RECORDS: 'LOAD_RECORDS',
    LOAD_RECORDS_FAILED: 'LOAD_RECORDS_FAILED',
    LOAD_RECORDS_SUCCESS: 'LOAD_RECORDS_SUCCESS',
    UPDATE_RECORD: 'UPDATE_RECORD',
    UPDATE_RECORD_FAILED: 'UPDATE_RECORD_FAILED',
    UPDATE_RECORD_SUCCESS: 'UPDATE_RECORD_SUCCESS',
    ADD_RECORD: 'ADD_RECORD',
    ADD_RECORD_FAILED: 'ADD_RECORD_FAILED',
    ADD_RECORD_SUCCESS: 'ADD_RECORD_SUCCESS',
};

const LoadRecordsFun = async (dispatch) => {
    try {
        const RecordSnapcshots = await firebase
            .firestore()
            .collection('Records')
            .get();

        const records = {};
        RecordSnapcshots.forEach((doc) => {
            const record = doc.data();
            records[doc.id] = record;
        });
        dispatch(LoadRecordsSuccess(records));
    } catch (err) {
        dispatch(LoadRecordsFailed(err));
        console.error(err);
    }
};

const UpdateRecordFun = async (data, dispatch) => {
    const { id, ...rest } = data;
    try {
        await firebase.firestore().collection('Records').doc(id).update(rest);
        dispatch(UpdateRecordSuccess(data));
    } catch (err) {
        dispatch(UpdateRecordFailed(err));
    }
};

export const LoadRecords = (dispatch) => {
    LoadRecordsFun(dispatch);
    return {
        type: ActionTypes.LOAD_RECORDS,
    };
};

const LoadRecordsFailed = (errors) => {
    return {
        type: ActionTypes.LOAD_RECORDS_FAILED,
        payload: errors,
    };
};

const LoadRecordsSuccess = (data) => {
    return {
        type: ActionTypes.LOAD_RECORDS_SUCCESS,
        payload: data,
    };
};

export const UpdateRecord = (data, dispatch) => {
    UpdateRecordFun(data, dispatch);
    return {
        type: ActionTypes.UPDATE_RECORD,
    };
};

const UpdateRecordSuccess = (data) => {
    return {
        type: ActionTypes.UPDATE_RECORD_SUCCESS,
        payload: data,
    };
};

const UpdateRecordFailed = (errors) => {
    return {
        type: ActionTypes.UPDATE_RECORD_FAILED,
        payload: errors,
    };
};

const AddRecordFun = async (data, dispatch) => {
    try {
        const res = await firebase.firestore().collection('Records').add(data);
        dispatch(AddRecordSuccess({ ...data, newId: res.id }));
    } catch (err) {
        dispatch(AddRecordFailed(err));
    }
};

export const AddRecord = (data, dispatch) => {
    AddRecordFun(data, dispatch);
    return {
        type: ActionTypes.ADD_RECORD,
    };
};

const AddRecordSuccess = (data) => {
    return {
        type: ActionTypes.ADD_RECORD_SUCCESS,
        payload: data,
    };
};

const AddRecordFailed = (errors) => {
    return {
        type: ActionTypes.ADD_RECORD_FAILED,
        payload: errors,
    };
};
