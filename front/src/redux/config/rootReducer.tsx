import {combineReducers} from 'redux';
import userSlice from '../reducers/userSlice';
import carbonSlice from '../reducers/carbonSlice';

const rootReducer = combineReducers({
    user: userSlice,  
    carbon: carbonSlice,
});

export default rootReducer;