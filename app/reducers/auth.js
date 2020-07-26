import { ActionTypes } from '../actions/auth';

const initialState = {
    user: null,
    authFailed: false,
    authSuccess: false,
    loading: false,
    errors: null,
};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN:
            return {
                ...state,
                loading: true,
            };
        case ActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                ...initialState,
                user: action.payload,
                authSuccess: true,
                loading: false,
            };
        case ActionTypes.LOGIN_FAILED:
            return {
                ...state,
                ...initialState,
                authFailed: true,
                loading: false,
                errors: action.payload,
            };
        default:
            return state;
    }
};
export default AuthReducer;
