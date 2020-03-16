import { combineReducers }      from 'redux';
import calendarReducer          from './calendar';
import reminderReducer          from './reminder';


export default combineReducers({
    calendar: calendarReducer,
    reminder: reminderReducer,

});