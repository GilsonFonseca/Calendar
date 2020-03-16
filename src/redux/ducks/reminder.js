import moment       from 'moment';

// CONST
export const Types = {
    SETREMINDER: 'reminder/SETREMINDER',
    GETREMINDER: 'reminder/GETREMINDER',
    GETREMINDERLIST: 'reminder/GETREMINDERLIST',
    REMOVEREMINDER: 'reminder/REMOVEREMINDER',
    REMOVEALL: 'reminder/REMOVEALL',
    GETREMINDERPERDAY: 'reminder/GETREMINDERPERDAY',
    CLEANREMINDER: 'reminder/CLEANREMINDER',
    SETWEATHER: 'reminder/SETWEATHER',
};




// INITIAL STATE

const initialState = {
    reminders: [],
    filteredReminders: [],
    arrayWeather: [],
    reminderID: 0,
}


function sortArray(array){
    array.sort(function (a, b) {
        if (a.selectedDate > b.selectedDate) {
          return 1;
        }
        if (a.selectedDate < b.selectedDate) {
          return -1;
        }
        return 0;
      });
    return array;
}

// REDUCER
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case Types.REMOVEALL:
            let deletedArrayPerDay = state.reminders.filter((reminder) =>
            {
                return (action.day !== moment(reminder.selectedDate).date())
            })
            return {
                ...state,
                reminders: deletedArrayPerDay,
            }

        case Types.REMOVEREMINDER:
            let deletedArray = state.reminders;
            deletedArray = deletedArray.filter((item, index) => {
                return (item.reminderID !== action.reminder.reminderID)
            });
            deletedArray = sortArray(deletedArray);

            return {
                ...state,
                reminders: deletedArray,
                filteredReminders: deletedArray,
            }

        case Types.SETREMINDER:
            let remindersArray = state.reminders;
            if(action.actionType === 'ADD') {
                remindersArray = state.reminders.concat(action.reminder);
            } else {
                remindersArray.map((item, index) => {
                    if(item.reminderID === action.reminder.reminderID) {
                        remindersArray[index] = action.reminder;
                    }
                    return null;
                })
            }
            remindersArray = sortArray(remindersArray);
            return {
                ...state,
                reminders: remindersArray,
                reminder: null,
            }

        case Types.GETREMINDER:
            return {
                ...state,
                reminder: state.filteredReminders[action.id],
            }

        case Types.GETREMINDERLIST:
            return {
                ...state,
                reminders: state.reminders,
            }

        case Types.SETWEATHER:
            let weatherArray = state.reminders;
            weatherArray.map((item, index) => {
                if(item.reminderID === action.dayWeather.reminderID) {
                    weatherArray[index].weather = action.dayWeather.weather;
                }
                return null;
            })
            return {
                ...state,
                reminders: weatherArray,
            }

        case Types.GETREMINDERPERDAY:
            let dayArray = state.reminders.filter((reminder) =>
            {
                return (action.day === moment(reminder.selectedDate).date())
            })

            return {
                ...state,
                filteredReminders: dayArray,
            }

        case Types.CLEANREMINDER:
            return {
                ...state,
                reminder: null,
            }

        default:
            return state
    }
}



// ACTIONS
function setReminder(params) {
    let actionType = null;
    if(params.reminderID === undefined) {
        actionType= 'ADD';
        params.reminderID =initialState.reminderID;
        initialState.reminderID = initialState.reminderID + 1;
    } 
    return dispatch => {
        dispatch({
            type: Types.SETREMINDER,
            reminder: params,
            actionType: actionType,
        });
    }
}

function getReminder(params) {
    return dispatch => {
        dispatch({
            type: Types.GETREMINDER,
            id: params
        });
    }
}

function getRemindersPerDay(params) {
    return dispatch => {
        dispatch({
            type: Types.GETREMINDERPERDAY,
            day: params
        });
    }
}

function cleanReminder() {
    return dispatch => {
        dispatch({
            type: Types.GETREMINDER,
        });
    }
}

function setWeather(params) {
    return dispatch => {
        dispatch({
            type: Types.SETWEATHER,
            dayWeather: params
        });
    }
}


function deleteReminder(params) {
    return dispatch => {
        dispatch({
            type: Types.REMOVEREMINDER,
            reminder: params
        });
    }
}

function deleteAll(params) {
    return dispatch => {
        dispatch({
            type: Types.REMOVEALL,
            day: params
        });
    }
}

function getList() {
    return dispatch => {
        dispatch({
            type: Types.GETREMINDERLIST,
        });
    }
}
export const actions = {
    setReminder,
    getReminder,
    cleanReminder,
    getRemindersPerDay,
    setWeather,
    deleteReminder,
    deleteAll,
    getList,
}
