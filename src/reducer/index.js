import weatherReducer from './weatherReducer';
import { combineReducers } from '@reduxjs/toolkit';

const allReducers = combineReducers({
    weatherReducer
})

export default allReducers;