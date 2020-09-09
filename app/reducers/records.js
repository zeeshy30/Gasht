import { ActionTypes } from '../actions/records';

const initialState = {
    data: null,
    loaded: false,
    updating: false,
    loading: false,
    errors: null,
};

const RecordReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LOAD_RECORDS:
            return {
                ...state,
                loading: true,
            };
        case ActionTypes.LOAD_RECORDS_SUCCESS:
            return {
                ...state,
                ...initialState,
                data: action.payload,
                loaded: true,
                loading: false,
            };
        case ActionTypes.LOAD_RECORDS_FAILED:
            return {
                ...state,
                ...initialState,
                loaded: false,
                loading: false,
                errors: action.payload,
            };

        case ActionTypes.UPDATE_RECORD:
            return {
                ...state,
                updating: true,
            };
        case ActionTypes.UPDATE_RECORD_SUCCESS:
            const { id, ...rest } = action.payload;
            return {
                ...state,
                updating: false,
                data: { ...state.data, [id]: rest },
            };
        case ActionTypes.UPDATE_RECORD_FAILED:
            return {
                ...state,
                updating: false,
                errors: action.payload,
            };

        case ActionTypes.ADD_RECORD:
            return {
                ...state,
                updating: true,
            };
        case ActionTypes.ADD_RECORD_SUCCESS:
            const { newId, ...newData } = action.payload;
            return {
                ...state,
                updating: false,
                data: { ...state.data, [newId]: newData },
            };
        case ActionTypes.ADD_RECORD_FAILED:
            return {
                ...state,
                updating: false,
                errors: action.payload,
            };
        case ActionTypes.DELETE_RECORD:
            return {
                ...state,
                updating: true,
            };
        case ActionTypes.DELETE_RECORD_SUCCESS:
            const { delId } = action.payload;
            const { [delId]: value, ...updatedData } = state.data;
            return {
                ...state,
                updating: false,
                data: updatedData,
            };
        case ActionTypes.DELETE_RECORD_FAILED:
            return {
                ...state,
                updating: false,
                errors: action.payload,
            };
        case ActionTypes.RESET:
            return {
                ...state,
                ...initialState,
            };
        default:
            return state;
    }
};
export default RecordReducer;
