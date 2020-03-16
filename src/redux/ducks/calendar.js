import moment       from 'moment';

// CONST
export const Types = {
    GETMONTH: 'reminder/GETMONTH',
};




// INITIAL STATE

const initialState = {
    month: moment().month(),
}

// REDUCER
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case Types.GETMONTH:
            return {
                ...state,
                month: action.params,
            }
        default:
            return state
    }
}



// ACTIONS

function getMonth(params) {
    return dispatch => {
        dispatch({
            type: Types.GETMONTH,
            params: params
        });
    }
}

export const actions = {
    getMonth,

}
