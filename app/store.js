import { createStore, combineReducers } from 'redux';
import authReducer from './reducers/auth';
import RecordReducer from './reducers/records';

const rootReducer = combineReducers({
    auth: authReducer,
    records: RecordReducer,
});

const configureStore = () => {
    return createStore(rootReducer);
};

export default configureStore;
