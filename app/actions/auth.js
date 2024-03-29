import { Alert } from 'react-native';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import { ActionTypes as RecordsActionTypes } from './records';

export const ActionTypes = {
    LOGIN: 'LOGIN',
    LOGIN_FAILED: 'LOGIN_FAILED',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGOUT: 'LOGOUT',
};

const LoginUser = async (email, password, dispatch) => {
    try {
        const res = await firebase
            .auth()
            .signInWithEmailAndPassword(email, password);
        const doc = await firebase
            .firestore()
            .collection('Users')
            .doc(res.user.uid)
            .get();
        dispatch(LoginSuccess(doc.data()));
    } catch (err) {
        if (firebase.auth().currentUser) {
            firebase.auth().signOut();
        }
        dispatch(LoginFailed(err));
        Alert.alert(err);
    }
};

export const Login = ({ email, password, dispatch }) => {
    LoginUser(email, password, dispatch);
    return {
        type: ActionTypes.LOGIN,
    };
};

export const LoginFailed = (errors) => {
    return {
        type: ActionTypes.LOGIN_FAILED,
        payload: errors,
    };
};

export const LoginSuccess = (data) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        payload: data,
    };
};

export const Logout = (dispatch) => {
    dispatch({ type: RecordsActionTypes.RESET });
    return { type: ActionTypes.LOGOUT };
};
